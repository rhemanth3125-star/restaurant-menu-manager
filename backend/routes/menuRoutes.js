const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menuController");

// Image storage settings
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  }

});

// Upload middleware
const upload = multer({
  storage: storage
});

// Routes

// GET all menu items
router.get("/", getMenuItems);

// ADD menu item with image
router.post("/", upload.single("image"), addMenuItem);

// UPDATE menu item with image
router.put("/:id", upload.single("image"), updateMenuItem);

// DELETE menu item
router.delete("/:id", deleteMenuItem);

module.exports = router;