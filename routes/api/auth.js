const express = require("express");

const ctrls = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

// signup route
router.post("/register", validateBody(schemas.registerSchema), ctrls.register);

// signin routes
router.post("/login", validateBody(schemas.loginSchema), ctrls.login);

router.post("/logout", authenticate, ctrls.logout);
router.get("/current", authenticate, ctrls.getCurrentUser);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrls.getAvatar
);

module.exports = router;
