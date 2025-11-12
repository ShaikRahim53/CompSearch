import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import companiesRoute from "./routes/companies.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/companies", companiesRoute);

const env = typeof process !== "undefined" && process.env ? process.env : {};
const PORT = process.env.PORT || 5000;

connectDB(env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.error("DB connection failed", e);
    if (typeof process !== "undefined" && typeof process.exit === "function") {
      process.exit(1);
    } else {
      throw e;
    }
  });
