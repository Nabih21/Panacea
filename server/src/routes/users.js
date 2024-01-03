import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserModel } from '../models/Users.js';
import nodemailer from 'nodemailer';
import { gmailPass } from '../env_variables.js';



const router = express.Router()


const sendVerificationEmail = async (email, verificationToken) => {

    //create a nodemailer transport
    const transporter = nodemailer.createTransport({

        host: '127.0.0.1', // Replace with the SMTP server address from ProtonMail Bridge
        port: 1025, // Replace with the SMTP port from ProtonMail Bridge
        secure: false,
        auth: {
            user: 'admin@panaceahealthapp.com',
            pass: `${gmailPass}`,
        },
        tls: {
            // Do not fail on invalid certs (if using self-signed certificates)
            rejectUnauthorized: false
        }

    });

    //email message
    const mailOption = {
        from: 'admin@panaceahealthapp.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email : http://localhost:3001/auth/verify/${verificationToken}`,
    }

    try {
        await transporter.sendMail(mailOption)

    } catch (err) {
        console.log("Error1", err)
    }
};

//register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    //console.log( req.body);

    try {
        // Check if the email is already registered
        const emailLower = req.body.email.toLowerCase();
        const existingUser = await UserModel.findOne({ email: emailLower });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new UserModel({
            email: emailLower,
            password: hashedPassword,
            verificationToken: crypto.randomBytes(20).toString('hex') // Generate verification token
        });

        // Save the user in the database
        await newUser.save();

        // Send verification email
        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.json({ message: "Registration complete" });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            console.error("Duplicate key error", error);
            res.status(409).json({ message: "User already exists with that information" });
        } else {
            // Handle other errors
            console.error("Error during registration", error);
            res.status(500).json({ message: "Failed to register user" });
        }
    }
});

//endpoint to verify email
router.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        const user = await UserModel.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" })
        }

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Email Verification Failed' });
    }
})


//generating secret key
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey
}
const secretKey = generateSecretKey();

//endpoint for LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLower = req.body.email.toLowerCase();
        const user = await UserModel.findOne({ email: emailLower })

        if (!user) {
            return res.status(401).json({ message: "user dont exist" }); // do we want to let the client know if that user exist?
        }
        if (!user.verified) {
            return res.json({ message: "Your account has not been verified, please verify your account by opening the link sent to you by Email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "password incorrect" });
        }

        const token = jwt.sign({ id: user._id }, secretKey); //need to change that as variable
        res.status(200).json({ token, userID: user._id });

    } catch (err) {
        res.status(500).json({ message: 'Login failed due to server error' });
    }
})


export { router as userRouter };