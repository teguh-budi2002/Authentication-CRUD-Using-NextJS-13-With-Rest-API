import Post from "../../models/post";
import Authorization from "../../middlewares/authorization";

export default async function DeleteController(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  const auth = await Authorization(req, res);
  const { id } = req.query;
  const isDeleted = (await Post.findOne({ id: id })).destroy();

  res.status(200);
  res.json({
    message: "Post Deleted Successfully",
  });
}
