const Stone = require("../models/Stone");

exports.getStones = async (req, res) => {
  try {
    const stones = await Stone.find({});
    res.json(stones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStone = async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ error: "Stone not found" });
    }
    res.json(stone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStone = async (req, res) => {
  try {
    const { name, description, alt, height, width, depth, price } = req.body;

    const url = {
      frontUrl: req.files["frontImage"] ? req.files["frontImage"][0].location : "",
      leftUrl: req.files["leftImage"] ? req.files["leftImage"][0].location : "",
      rightUrl: req.files["rightImage"] ? req.files["rightImage"][0].location : "",
      backUrl: req.files["backImage"] ? req.files["backImage"][0].location : "",
      topUrl: req.files["topImage"] ? req.files["topImage"][0].location : "",
    };

    const newStone = new Stone({
      name,
      description,
      alt,
      price,
      height,
      width,
      depth,
      url,
    });

    const savedStone = await newStone.save();

    res.status(201).json(savedStone);
  } catch (error) {
    console.error("Error creating stone:", error);
    res
      .status(500)
      .json({ message: "Error creating the stone", error: error.message });
  }
};

exports.editStone = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, alt, height, width, depth, price } = req.body;

    const updateData = {
      name,
      description,
      alt,
      height,
      width,
      depth,
      price,
    };

    const url = {};
    if (req.files["frontImage"]) {
      url.frontUrl = req.files["frontImage"][0].location;
    }
    if (req.files["leftImage"]) {
      url.leftUrl = req.files["leftImage"][0].location;
    }
    if (req.files["rightImage"]) {
      url.rightUrl = req.files["rightImage"][0].location;
    }
    if (req.files["backImage"]) {
      url.backUrl = req.files["backImage"][0].location;
    }
    if (req.files["topImage"]) {
      url.topUrl = req.files["topImage"][0].location;
    }

    if (Object.keys(url).length > 0) {
      updateData.url = url;
    }

    const updatedStone = await Stone.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStone) {
      return res.status(404).json({ message: "Stone not found" });
    }

    res.status(200).json(updatedStone);
  } catch (error) {
    console.error("Error updating stone:", error);
    res
      .status(500)
      .json({ message: "Error updating the stone", error: error.message });
  }
};

exports.removeStone = async (req, res) => {
  try {
    const deletedStone = await Stone.findByIdAndDelete(req.params.id);
    if (!deletedStone) {
      return res.status(404).json({ error: "Stone not found" });
    }
    res.json(deletedStone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
