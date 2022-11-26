import Post from "../../models/post";
import Authorization from "../../middlewares/authorization";

export default async function UpdateController(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  const auth = await Authorization(req, res);
  const { id } = req.query;
  const { title, slug, descrption } = req.body;
  const getPost = (await Post.findOne({ where: { id } })).update({
    title,
    slug,
    descrption,
  });

  res.status(200);
  res.json({
    message: "Post Updated Successfully",
    status: 200,
  });
}
