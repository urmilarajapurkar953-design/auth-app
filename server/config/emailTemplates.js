export const PASSWORD_RESET_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Password Reset</title>
</head>

<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f4f4;">

<table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="500" style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">

<tr>
<td>
<h2 style="color:#333;">Reset Your Password</h2>
</td>
</tr>

<tr>
<td style="color:#555;font-size:16px;padding-top:10px;">
We received a request to reset your password. Use the OTP below to continue.
</td>
</tr>

<tr>
<td style="padding:25px 0;">
<div style="
display:inline-block;
font-size:28px;
letter-spacing:8px;
font-weight:bold;
color:#dc2626;
background:#fef2f2;
padding:12px 25px;
border-radius:6px;
">
${otp}
</div>
</td>
</tr>

<tr>
<td style="color:#777;font-size:14px;">
This OTP is valid for <b>10 minutes</b>.
</td>
</tr>

<tr>
<td style="padding-top:20px;color:#777;font-size:14px;">
If you did not request a password reset, please ignore this email or secure your account.
</td>
</tr>

<tr>
<td style="padding-top:30px;color:#aaa;font-size:12px;">
© ${new Date().getFullYear()} Your App. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;



export const WELCOME_EMAIL_TEMPLATE = (name) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Welcome to Our App</title>
</head>

<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f4f4;">

<table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="500" style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">

<tr>
<td>
<h2 style="color:#333;">Welcome to Our App, ${name}!</h2>
</td>
</tr>

<tr>
<td style="color:#555;font-size:16px;padding-top:10px;">
Thank you for signing up! We're excited to have you on board.
</td>
</tr>

<tr>
<td style="padding:25px 0;">
<p style="color:#777;font-size:14px;">
You can now log in and start exploring all the features we have to offer.
</p>
</td>
</tr>

<tr>
<td style="padding-top:30px;color:#aaa;font-size:12px;">
© ${new Date().getFullYear()} Your App. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;