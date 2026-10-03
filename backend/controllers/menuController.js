const MenuItem = require("../models/MenuItem");

// GET all menu items
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching menu items"
    });
  }
};

// ADD menu item
const addMenuItem = async (req, res) => {
  try {
    const { name, price, category,popular } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const newItem = new MenuItem({
      name,
      price,
      category,
      image,
      popular: popular === "true"
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding menu item"
    });
  }
};

// UPDATE menu item
const updateMenuItem = async (req, res) => {
  try {
    const { name, price, category,popular } = req.body;

    const updateData = {
      name,
      price,
      category
      popular: popular === "true"
    };

    // Update image only if a new image was selected
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json(updatedItem);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating menu item"
    });
  }
};

// DELETE menu item
const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(
      req.params.id
    );

    if (!deletedItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json({
      message: "Menu item deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting menu item"
    });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
};