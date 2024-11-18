const express = require("express");
const app = express();
const cors = require("cors");
const tinyurl = require("tinyurl");
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE",
};
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE",
}));


app.get("/", (req, res) => {
  res.json("kitna accha lag raha kuch bhi likho");
});
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const data = result.response.text();
    const mainData = data.replace(/(\*\*|\#)/, "\n");
    const filteredText = mainData.replace(/(\*\*|\*)/g, "");
    res.json(filteredText);
  } catch (error) {
    if (error.message === "[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: fetch failed") {
      res.send("Bhaiya Data nahi hy")
    } else {
      res.send(error.message);
    }
  }
});
app.post("/api/generate_short_Url", async (req, res) => {
  try {
    const { longURL } = req.body;
    const shortURL = await tinyurl.shorten(longURL);
    res.json({ msg: shortURL });
  } catch (error) {
    console.error("Error shortening URL:", error);
  }
});
app.listen(3000);
