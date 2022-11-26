import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function LoginController(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { email, password } = req.body;
    const getUser = await User.findOne({
      where: {
        email: email,
      },
    });

    const checkUser = await bcrypt.compare(password, getUser.password);
    if (checkUser) {
      const signedIn = jwt.sign(
        { data: checkUser },
        "iniPrivateKey",
        { expiresIn: 360000000 },
        (err, token) => {
          res.status(200);
          res.json({
            message: "Login Successfully",
            token: token,
            status: 200,
          });
        }
      );
    } else {
      res.status(401);
      res.json({
        message: "Email or Password Is Wrong.",
        status: 401,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Your Data Is Invalid.",
      status: 404,
    });
  }
}
