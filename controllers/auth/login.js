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
        { expiresIn: "7d" },
        (err, token) => {
          res.status(200);
          res.json({
            message: "Login Successfully",
            token: token,
          });
        }
      );
    } else {
      res.status(404);
      res.json({
        message: "Data Tidak Ditemukan",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Data Tidak Ditemukan.",
    });
  }
}
