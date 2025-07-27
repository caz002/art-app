import express from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    getFixedPosts,
} from "../controllers/postsController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// router.get("/", getAllPosts);
router.get("/", getFixedPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("postImage"), createPost);
router.delete("/:id", deletePost);

export default router;
