import { Router } from "express";
import { adminLogin, adminLogout } from "../Controllers/adminController.js";
import { adminAuth } from "../Middleware/adminAuth.js";

const router = Router();

router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);
router.get("/admin/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
