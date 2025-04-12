import mongoose from "mongoose"

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ingredients: String,
  preparationSteps: String,
  cookingTime: String,
  origin: String,
  spice: String
  
});

export const Dish = mongoose.model('Dish', dishSchema);
