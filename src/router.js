import express from "express"
import { Album } from "./model/album.js"
import path from "path"
import { fileURLToPath } from "url";

// Compute __filename and __dirname
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME =  path.dirname(FILENAME);



export const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.join(DIRNAME , 'index.html'))
})

router.get('/album', async (req, res) => {
  try {
    const items = await Album.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/album', async (req, res) => {
  try {
    const newAlbum = new Album(req.body)
    const savedAlbum = await newAlbum.save()
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
