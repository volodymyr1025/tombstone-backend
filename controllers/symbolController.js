const Symbol = require("../models/Symbol");

exports.getSymbols = async (req, res) => {
  try {
    const symbols = await Symbol.find({});
    res.send(symbols);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createSymbol = async (req, res) => {
  try {
    const { name, alt, price, type, height, width } = req.body;

    const url = req.files["image"] ? req.files["image"][0].location : "";

    const newSymbol = new Symbol({
      name,
      alt,
      price,
      height,
      width,
      type,
      url,
    });

    const savedSymbol = await newSymbol.save();

    res.status(201).json(savedSymbol);
  } catch (error) {
    console.error("Error creating symbol:", error);
    res
      .status(500)
      .json({ message: "Error creating the symbol", error: error.message });
  }
};

exports.editSymbol = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alt, price, type, height, width } = req.body;

    const updateData = {
      name,
      alt,
      price,
      height,
      width,
      type,
    };

    if (req.files["image"]) {
      updateData.url = req.files["image"][0].location;
    }

    const updatedSymbol = await Symbol.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSymbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }
    res.status(200).json(updatedSymbol);
  } catch (error) {
    console.error("Error creating symbol:", error);
    res
      .status(500)
      .json({ message: "Error creating the symbol", error: error.message });
  }
};

exports.removeSymbol = async (req, res) => {
  try {
    const deletedSymbol = await Symbol.findByIdAndDelete(req.params.id);
    if (!deletedSymbol) {
      return res.status(404).json({ error: "Symbol not found" });
    }
    res.json(deletedSymbol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};