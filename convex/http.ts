import { httpRouter } from "convex/server";
import { httpAction, query } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";
import stripe from "../src/lib/stripe";
import { WelcomeEmailHtml } from "@/emails/WelcomeEmail";
import resend from "@/lib/resend";
import { ConvexHttpClient } from "convex/browser";
const http = httpRouter();

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const clerkWebhook = httpAction(async (ctx, request) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set");
  }

  const svix_id = request.headers.get("svix-id");
  const svix_timestamp = request.headers.get("svix-timestamp");
  const svix_signature = request.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim();

    try {
      //todo: create the user save it to db
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: { clerkId: id },
      });

      await ctx.runMutation(api.users.createUser, {
        email,
        name,
        clerkId: id,
        stripeCustomerId: customer.id,
      });

      // if (process.env.NODE_ENV === "development") {
      try {
        const html = WelcomeEmailHtml(name, process.env.NEXT_PUBLIC_APP_URL!);

        const data = await resend.emails.send({
          from: "MasterClass <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to MasterClass!",
          html, // ✅ pass plain HTML
        });

        console.log("Resend response:", data);
      } catch (err) {
        console.error("Resend error:", err);
      }

      // }
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occured", { status: 500 });
    }
  }
  return new Response("User created", { status: 200 });
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: clerkWebhook,
});

export default http;
