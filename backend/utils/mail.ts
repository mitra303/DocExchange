import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 🔐 Ensure env variables exist
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  throw new Error("MAIL_USER or MAIL_PASS is missing in .env");
}

// ✅ Create transporter with proper typing
export const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASS as string,
  },
});