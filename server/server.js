import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors()); // Allow server to be called from frontend
app.use(express.json()); // Allow to pass json from frontend to backend

// can be used to receive data from frontend
app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from codex",
  });
});

// To receive data from frontend but has a body
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "en");
    encodedParams.set("target_language", "ur");
    encodedParams.set("text", prompt);

    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const translation = result.data.translatedText;

    res.status(200).send({
      bot: translation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
