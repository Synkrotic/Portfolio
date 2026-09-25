// api/index.ts
import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readdir } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const allowedOrigins = ["*"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

async function getProgramFiles(program: string): Promise<string[]> {
  const files = await readdir(path.join(__dirname, `../public/repositories/${program}`));
  return files;
}

app.use("/api/repositories", express.static(path.join(__dirname, "../public/repositories")));

app.get("/api/newest/:program", async (req, res) => {
  const { program } = req.params;
  try {
    const files = await getProgramFiles(program);
    res.json(files.at(-1));
  } catch {
    res.status(404).json({ error: "program not found" });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT ?? 3001;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;