const ElectricalPlumbing = require("../models/electricalplumbing");


// ==========================
// GET ALL
// ==========================
exports.getAll = async (req, res) => {

    try {

        const data = await ElectricalPlumbing.find()
            .sort({ createdAt: -1 });

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// ==========================
// ADD
// ==========================
exports.create = async (req, res) => {

    try {

        const newData = new ElectricalPlumbing(req.body);

        await newData.save();

        res.json({
            message: "Added Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// ==========================
// UPDATE
// ==========================
exports.update = async (req, res) => {

    try {

        await ElectricalPlumbing.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            message: "Updated Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// ==========================
// DELETE
// ==========================
exports.remove = async (req, res) => {

    try {

        await ElectricalPlumbing.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};