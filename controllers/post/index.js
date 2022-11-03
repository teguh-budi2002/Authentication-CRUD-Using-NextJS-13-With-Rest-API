import Post from "../../models/post";
export default async function IndexController(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const getAllPosts = await Post.findAll();

  res.status(200);
  res.json({
    message: "Getting All Post",
    Posts: getAllPosts,
  });
}
