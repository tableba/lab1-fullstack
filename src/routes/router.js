import express from "express"
import { Dish } from "../model/dish.js"
import path from "path"

export const router = express.Router()

//Get all dishes
router.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET dish by name
router.get('/api/dishes/:name', async (req, res) => {
  try {
    const dishes = await Dish.find({ name: `${req.params.name}`});
    if (dishes.length !== 0) {
      res.status(200).json(dishes);
    } else {
      res.status(404).json({ message: "Dish not found."});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST dish
router.post('/api/dishes', async (req, res) => {
  try {
    const newdish = new Dish(req.body)
    const saveddish = await newdish.save()
    res.status(201).json(newdish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//UPDATE dish by name
router.put('/api/dishes/:id', async (req, res) => {
  try {
    const dishes = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (dishes) {
      res.status(200).json(dishes);
    } else {
      res.status(404).json({ message: "Dish not found."});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//DELETE dish
router.delete('/api/dishes/:id', async (req, res) => {
  try {
    const dishes = await Dish.findByIdAndDelete(req.params.id);
    if (dishes) {
      res.json({ message: "Dish deleted."});
    } else {
      res.status(404).json({ message: "Dish not found."});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
