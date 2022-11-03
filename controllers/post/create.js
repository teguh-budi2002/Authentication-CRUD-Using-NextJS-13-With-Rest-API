import Post from "../../models/post";
import Authorization from "../../middlewares/authorization";

export default async function createController(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const auth = await Authorization(req, res);

  const { title, slug, description } = req.body;
  const isCreated = await Post.create({ title, slug, description });

  res.status(201);
  res.json({ message: "Post Created Successfully" });
}
