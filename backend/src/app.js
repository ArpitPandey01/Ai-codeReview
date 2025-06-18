import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(cors());
app.use(express.json());

app.use("/ai", aiRoutes);

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

// Catch-all for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../Frontend/dist/index.html"));
});

export default app;
