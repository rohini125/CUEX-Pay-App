import express from "express";
import multer from "multer";
import path from "path";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} from "../controllers/profileController.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only .jpeg, .jpg, and .png files are allowed"));
  },
});

// Routes
router.get("/:userId", getProfile);
router.put('/:id', updateProfile); // ✅ Correct route
router.post("/upload/:userId", upload.single("profileImage"), uploadProfileImage);
router.delete("/delete/:userId", deleteProfileImage);

export default router;
