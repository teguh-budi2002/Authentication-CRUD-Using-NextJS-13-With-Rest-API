import User from "../../models/user";
import bcrypt from "bcrypt";

export default async function RegisterController(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const saltPassword = await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log({ email: email });
      const isCreated = User.create({
        email,
        password: hash,
      });
    });
  });

  res.status(201);
  res.json({ message: "User Created Successfully" });
}
