// src/emails/WelcomeEmailHtml.ts
export function WelcomeEmailHtml(name: string, url: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to MasterClass</title>
    </head>
    <body style="background-color:#f6f9fc; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif; margin:0; padding:0;">
      <div style="margin:0 auto; padding:20px 0 48px; width:580px;">
        <div style="background-color:#ffffff; padding:40px; border-radius:5px;">
          <h1 style="font-size:32px; line-height:1.3; font-weight:700; color:#1a1a1a; text-align:center; letter-spacing:-1px;">Welcome to MasterClass!</h1>
          <p style="margin:0 0 16px; color:#484848; font-size:16px; line-height:24px;">Hello ${name},</p>
          <p style="margin:0 0 16px; color:#484848; font-size:16px; line-height:24px;">
            We're thrilled to have you join our community of learners! You've taken the first step towards mastering modern development skills through engaging, project-based learning.
          </p>
          <hr style="border-color:#e6e6e6; margin:20px 0;" />
          <p style="margin:0 0 16px; color:#484848; font-size:16px; line-height:24px;">With MasterClass, you can:</p>
          <ul style="margin:0 0 16px; color:#484848; font-size:16px; line-height:24px; padding-left:30px;">
            <li>Build real-world projects like Netflix and Twitter clones</li>
            <li>Master full-stack development with the MERN stack</li>
            <li>Learn at your own pace with our flexible, online platform</li>
          </ul>
          <hr style="border-color:#e6e6e6; margin:20px 0;" />
          <p style="margin:0 0 16px; color:#484848; font-size:16px; line-height:24px;">
            Ready to start forging your path in modern development? Explore our course catalog and begin your learning journey today!
          </p>
          <a href="${url}" style="display:block; text-align:center; background-color:#5e6ad2; color:#fff; font-size:16px; font-weight:bold; padding:12px; border-radius:5px; text-decoration:none;">Explore Courses</a>
        </div>
        <hr style="border-color:#e6e6e6; margin:20px 0;" />
        <div style="margin-top:32px; text-align:center; color:#9ca299; font-size:14px;">
          © ${new Date().getFullYear()} MasterClass, Inc. All Rights Reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
