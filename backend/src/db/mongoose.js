const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

const DB_NAME = "PaperDB";

const LOCAL_DB_CONNECTION = "mongodb://127.0.0.1:27017/paper-db";
const REMOTE_DB_CONNECTION = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.72t4jb2.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(REMOTE_DB_CONNECTION);
