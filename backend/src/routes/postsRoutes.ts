import express from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
} from "../controllers/postsController";
import { upload } from "../middleware/multerMiddleware";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("postImage"), createPost);
router.delete("/:id", deletePost);

export default router;
