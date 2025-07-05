import express from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/postsController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", upload.single('postImage'), createPost);

export default router;