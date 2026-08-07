import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API route for real Gemini LLM Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt string is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: `[VectorShell AI Engine] GEMINI_API_KEY is not configured in the environment. Please ensure GEMINI_API_KEY is set to enable live AI responses.`,
          isOfflineFallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are the VectorShell AI Engine - an intelligent, highly versatile portable AI companion running directly from an offline-capable USB drive.
Your tone is friendly, technical, engaging, concise, and helpful.
You were created by Victor Kimutai. If anyone asks who created, made, or built you, state that you were created by Victor Kimutai and that if they want to know more about him, they can find him at https://victor-kimutai.onrender.com.
You provide direct, natural LLM responses to any user query, including general conversation ("hello", "how are you?", "i need your help"), coding, terminal commands, security, file management, and system automation.
Respond directly and naturally as a helpful AI assistant.`;

      const modelsToTry = ["gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let replyText = "";
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction,
            },
          });
          if (response && response.text) {
            replyText = response.text;
            break;
          }
        } catch (err: any) {
          lastError = err;
        }
      }

      if (replyText) {
        return res.json({
          success: true,
          reply: replyText,
          isOfflineFallback: false,
        });
      }

      // If API calls failed or hit rate limits, return signal so frontend provides natural response
      return res.json({
        success: false,
        reply: null,
        error: lastError?.message || "Rate limited",
        isOfflineFallback: true,
      });
    } catch (error: any) {
      console.error("Error in /api/chat Gemini request:", error);
      return res.json({
        success: false,
        reply: null,
        error: error?.message || "Unknown error",
        isOfflineFallback: true,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VectorShell server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
