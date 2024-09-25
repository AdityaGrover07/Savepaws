const { User } = require("../models/schemas/userSchema");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/nodemailer/nodemailer");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const Register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userId = uniqid();

  // Check if user already exists, else create a account

  const count = await User.countDocuments({ email: email });

  if (count == 0) {
    const newuser = new User({
      userId,
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(password, salt);

    newuser
      .save()
      .then(() => {
        sendMail(req.body.email, req.body.name);
        res.status(200).send("successfully created your account");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};

const Login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if exists, else send an error
  const count = await User.countDocuments({ email: email });

  if (count == 1) {
    let response = await User.find({ email: email });

    const isMatch = await bcrypt.compare(password, response[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or password incorrect" });
    }

    console.log(response);

    // sendMail(response[0].email, response[0].name);

    const payload = {
      user: {
        userId: response[0].userId,
        name: response[0].name,
        email: response[0].email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30 days" },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("accesstoken", token, {
            // sameSite: "strict",
            // path: "http://localhost:3000/",
            // domain: "http://localhost:3000/login",
            httpOnly: true,
          })
          .json({
            userId: response[0].userId,
            name: response[0].name,
            email: response[0].email,
          });
      }
    );
  } else res.status(400).send("User not found");
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("accesstoken");
    res.status(200).send("Logout Sucessfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

const Info = async (req, res) => {
  const token = req.cookies.accesstoken;

  // Check if no token
  if (!token) {
    return res
      .status(200)
      .json({ status: 400, msg: "No token, authorization denied" });
  }

  // Token
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(200).json({ status: 400, msg: "Not a valid token" });
      } else {
        let userId = decoded.user.userId;
        let user = await User.find({ userId: userId }).select("-password");

        res.status(200).send(user);
      }
    });
  } catch (err) {
    return res.status(200).json({ status: 400, msg: err });
  }
};

const userInfo = async (req, res) => {
  const UserID = req.body.UserID;

  try {
    let response = await User.find(
      { userId: UserID },
      { userId: 1, name: 1, email: 1, mobile: 1 }
    );
    res.status(200).send({ status: "success", userInfo: response });
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

module.exports = { Register, Login, Logout, Info, userInfo };
