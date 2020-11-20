import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import path from "path";

import api from "./api";

dotenv.config();
var corsOptions = {
  origin: "https://localhost:3000",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIES_KEY));

app.get("/health", (_, res) => {
  res.status(200).json({ message: "Everything's good!" });
});

app.use("/api", api);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running an API server at localhost:${port}`);

// Uncomment to print routes
// const filepath = path.join(__dirname, "./routes.generated.txt");
// require("express-print-routes")(app, filepath);
