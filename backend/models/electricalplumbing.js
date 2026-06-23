const mongoose = require("mongoose");

const electricalPlumbingSchema = new mongoose.Schema({

    mainHeading: {
        type: String
    },

    mainDescription: {
        type: String
    },

    icon: {
        type: String
    },

    title: {
        type: String
    },

    description: {
        type: String
    },

    type: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model(
    "ElectricalPlumbing",
    electricalPlumbingSchema
);