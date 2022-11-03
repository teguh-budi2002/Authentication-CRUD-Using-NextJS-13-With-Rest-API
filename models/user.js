const { DataTypes } = require("sequelize");
import db from "../libs/db";

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default User;
