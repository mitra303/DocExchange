// controllers/auth.controller.ts

import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/mail";
// import cors from "cors";


interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: number;
  status?: number;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ResetBody {
  token: string;
  password: string;
}


export const register = async (req: Request, res: Response) => {
  const { name, email, password, role, status } = req.body as RegisterBody;

  try {
    // 🔐 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔍 Check existing user
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 🛡️ Safe values
    const safeRole = [1, 2].includes(role ?? 2) ? role : 2;
    const safeStatus = status === 2 ? 2 : 1;

    // ✅ Create user (IMPORTANT: store it)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: safeRole,
      status: safeStatus,
    });

    // ✅ Send response FIRST (fast API)
    res.status(201).json({
      message: "User registered successfully",
    });

    // ✅ Send email (non-blocking)
    const loginLink = `${process.env.CLIENT_URL}/login`;

    transporter
      .sendMail({
        from: `"DocExchange" <${process.env.MAIL_USER}>`,
        to: user.email,
        subject: "Welcome to DocExchange",
        html: getWelcomeTemplate(
          user.name,
          user.email,
          // "••••••••", // never send real password
          password,
          loginLink
        ),
      })
      .then(() => {
        console.log("Welcome email sent");
      })
      .catch((err) => {
        console.error("Mail error:", err);
      });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginBody;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token, // ✅ MUST
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const sendResetLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" } // synced with email
    );

    // 🔥 IMPORTANT: store in DB
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Reset Your Password – DocExchange",
       html: getResetPasswordTemplate(link),
    });

    res.json({ message: "Link sent successfully" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({ message: "Error sending mail" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token as string;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password required",
      });
    }

    let decoded: any;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
    } catch {
      return res.status(400).json({
        message: "Reset link expired or invalid",
      });
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(404).json({
        message: "Link already used or expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ❗ invalidate token (one-time use)
    user.resetToken = null;
    user.resetTokenExpiry = null;

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


export const getResetPasswordTemplate = (link: string): string => {
  return `
    <table width="100%" style="background:#f4f6fb; padding:20px; font-family:Arial, sans-serif;">
      <tr>
        <td align="center">

          <table width="500" style="width:500px; background:#ffffff; border-radius:10px; padding:25px;">

            <!-- TITLE -->
            <tr>
              <td align="center">
                <h2 style="color:#333; margin-bottom:10px;">
                  Reset Your Password
                </h2>
                <p style="color:#666; font-size:14px; margin-bottom:20px;">
                  Click the button below to reset your password.
                </p>
              </td>
            </tr>

            <!-- BUTTON -->
            <tr>
              <td align="center">
                <a href="${link}" 
                  style="
                    background-color:#6366f1;
                    color:#ffffff;
                    padding:14px 30px;
                    text-decoration:none;
                    border-radius:6px;
                    display:inline-block;
                    font-size:14px;
                    font-weight:600;
                    font-family:Arial, sans-serif;
                  ">
                  Reset Password
                </a>
              </td>
            </tr>

            <!-- EXPIRY -->
            <tr>
              <td align="center" style="padding-top:25px;">
                <p style="font-size:12px; color:#888; line-height:1.5;">
                  This password reset link will expire in 
                  <strong style="color:#333;">15 minutes</strong>.
                  <br/>
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  `;
};

export const getWelcomeTemplate = (
  name: string,
  email: string,
  password: string, // ⚠️ optional (see note below)
  loginLink: string
): string => {
  return `
  <table width="100%" style="background:#f4f6fb; padding:20px; font-family:Arial, sans-serif;">
    <tr>
      <td align="center">

        <table width="500" style="background:#ffffff; border-radius:10px; padding:25px;">

          <!-- TITLE -->
          <tr>
            <td align="center">
              <h2 style="color:#333;">Welcome to DocExchange</h2>
              <p style="color:#666; font-size:14px;">
                Your account has been created successfully.
              </p>
            </td>
          </tr>

          <!-- USER DETAILS -->
          <tr>
            <td style="padding:20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </td>
          </tr>

          <!-- BUTTON -->
          <tr>
            <td align="center">
              <a href="${loginLink}" 
                style="
                  background:#6366f1;
                  color:#fff;
                  padding:12px 25px;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  display:inline-block;
                ">
                Click to Login
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:20px;">
              <p style="font-size:12px; color:#888;">
                If you did not create this account, please ignore this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
  `;
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, role, status, password } = req.body;

    const updateData: any = {
      updatedAt: new Date(),
    };

    // update allowed fields
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;

    // message variable
    let message = "User updated successfully";

    // password update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      updateData.password = hashedPassword;

      message = "Password updated successfully";
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};