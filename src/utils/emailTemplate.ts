export const welcomeEmailTemplate = (userName: string | null, userEmail: string | null, userPassword: string | null): string => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            margin: 10px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
        }
        .footer {
            font-size: 0.9em;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to RothReady, ${userName || 'User'}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Here are your login details:</p>
        <ul>
            <li><strong>Email:</strong> ${userEmail || 'N/A'}</li>
            <li><strong>Password:</strong> ${userPassword || 'N/A'}</li>
        </ul>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Best regards,</p>
        <p>RothReady</p>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} RothReady. All rights reserved.</p>
    </div>
</body>
</html>
`;

export const welcomeEmailTemplateToAdmin = (userName: string | null, userEmail: string | null, userPassword: string | null): string => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            margin: 10px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
        }
        .footer {
            font-size: 0.9em;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New User Registration!</h1>
        <p>Here are user's details:</p>
        <ul>
            <li><strong>Email:</strong> ${userEmail || 'N/A'}</li>
            <li><strong>Name:</strong> ${userName || 'User'}</li>
        </ul>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} RothReady. All rights reserved.</p>
    </div>
</body>
</html>
`;


export const roleAssignmentEmailTemplate = (userEmail: string | null, role: string | null): string => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            margin: 10px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
        }
        .footer {
            font-size: 0.9em;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Role Assignment Notification</h1>
        <p>We are pleased to inform you that your user role has been successfully assigned.</p>
        <p>Here are your details:</p>
        <ul>
            <li><strong>Email:</strong> ${userEmail || 'N/A'}</li>
            <li><strong>Role:</strong> ${role || 'N/A'}</li>
        </ul>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Best regards,</p>
        <p>RothReady</p>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} RothReady. All rights reserved.</p>
    </div>
</body>
</html>
`;


export const welcomeEmailTemplateForInviteUser = (userEmail: string | null, userPassword: string | null): string =>  `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            margin: 10px 0;
        }
        .footer {
            font-size: 0.9em;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
    <h1>Welcome to RothReady!</h1>
        <p>We're excited to have you on board.</p>
        <p>Here are your login details:</p>
        <ul>
            <li><strong>Email:</strong> ${userEmail}</li>
            <li><strong>Password:</strong> ${userPassword}</li>
        </ul>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Best regards,</p>
        <p>RothReady</p>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} RothReady. All rights reserved.</p>
    </div>
</body>
</html>
`;

