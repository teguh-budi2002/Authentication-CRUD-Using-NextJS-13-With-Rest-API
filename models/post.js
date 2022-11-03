import db from "../libs/db";
import { DataTypes } from "sequelize";

const Post = db.define("Post", {
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  description: DataTypes.STRING,
});

export default Post;
