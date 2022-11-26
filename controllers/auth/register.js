import User from "../../models/user";
import bcrypt from "bcrypt";

export default async function RegisterController(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  const getUser = await User.findOne({ where: { email } });
  if (!getUser) {
    const saltPassword = await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const isCreated = User.create({
          email,
          password: hash,
        });
      });
    });
    res.status(201);
    res.json({
      message: "Congratulations, User Registered Successfully",
      status: 200,
    });
  } else {
    res.status(400);
    res.json({
      message: "Something went wrong, Please try again.",
      status: 400,
    });
  }
}
