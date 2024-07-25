import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    html?: string;
}

const sendMail = async (mailOptions: MailOptions): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 587,
            secure: false, // use TLS
            auth: {
                user: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
                pass: process.env.NEXT_PUBLIC_SUPPORT_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000, // 5 seconds
            socketTimeout: 10000 // 10 seconds
        });

        let defaultMailOptions = {
            from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
        };

        await transporter.sendMail({ ...defaultMailOptions, ...mailOptions });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendMail;
