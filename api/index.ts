// api/index.ts
import express from "express";
import cors from "cors";
import { list } from "@vercel/blob";

const app = express();

const allowedOrigins = ["*"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/newest/:program", async (req, res) => {
  const { program } = req.params;
  try {
    const { blobs } = await list({ prefix: `${program}/` });
    if (blobs.length === 0) {
      return res.status(404).json({ error: "program not found" });
    }
    const newest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    res.json({ filename: newest.pathname.split("/").pop(), url: newest.url });
  } catch (err) {
    res.status(500).json({ error: "failed to list files" });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT ?? 3001;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;