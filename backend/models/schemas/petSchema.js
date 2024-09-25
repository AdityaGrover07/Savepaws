const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    /*
  unique Id of the pet
  */
    PetID: {
      type: String,
      required: true,
    },
    /*
  user Id of the rescuer
  */
    RescuerID: String,
    /*
  Can be left empty, If pet is not named
  */
    Name: String,
    /*
  1 - Dog, 2- Cat, 3- Cow, 4- Others
  */
    Type: {
      type: Number,
    },
    /*
  Age in months calcutated at the moment of pet enroll
  */
    Age: Number,
    Breed1: Number,
    Breed2: Number,
    Gender: {
      type: Number,
      // enum: ["Male", "Female", "Not Known"],
    },
    Color1: Number,
    Color2: Number,
    Color3: Number,
    /**
     * 1 - YES, 2 - NO, 3 - NOT SURE
     */
    Vaccinated: {
      type: Number,
    },
    Sterilized: {
      type: Number,
    },
    Health: {
      type: Number,
      // enum: [, "Minor Injury", "Serious Injury", "Not Specified"],
    },

    location: {
      type: { type: String },
      coordinates: [Number],
    },

    State: Number,
    City: String,
    Pincode: Number,
    Description: {
      type: String,
      maxLength: 10000,
    },
    PhotoAmt: {
      type: Number,
    },
    /*
  Adoption status
  */
    Status: {
      type: Boolean,
      default: false,
    },
    AdopterID: String,
    social: [
      {
        type: Schema.Types.ObjectId,
        ref: "Social",
      },
    ],
    //  purpose: "", Adoption OR Sell
  },
  { timestamps: true }
);

petSchema.index({ location: "2dsphere" });

const Pet = mongoose.model("Pet", petSchema);

module.exports = { Pet };
