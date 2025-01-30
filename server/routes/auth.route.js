import express from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

// route to verify the token
router.get("/verify-token", verifyToken, (req, res) => {
  res.json({
    isAuthenticated: true,
    admin: req.admin, // Information from the decoded token
  });
});

export default router;
