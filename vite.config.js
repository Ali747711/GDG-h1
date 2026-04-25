import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load ALL env vars (including non-VITE_ ones like GEMINI_API_KEY) into process.env
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-middleware",
        configureServer(server) {
          server.middlewares.use("/api/analyze-symptoms", async (req, res) => {
            // CORS headers
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Content-Type, Authorization",
            );

            if (req.method === "OPTIONS") {
              res.writeHead(200);
              res.end();
              return;
            }

            if (req.method !== "POST") {
              res.writeHead(405, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            // Read request body
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", async () => {
              try {
                req.body = JSON.parse(body || "{}");
              } catch {
                req.body = {};
              }

              // Vercel-compatible response wrapper
              const wrappedRes = {
                _code: 200,
                setHeader(k, v) {
                  if (!res.headersSent) res.setHeader(k, v);
                },
                status(code) {
                  this._code = code;
                  return this;
                },
                json(data) {
                  if (!res.headersSent) {
                    res.writeHead(this._code, {
                      "Content-Type": "application/json",
                    });
                  }
                  res.end(JSON.stringify(data));
                },
                end() {
                  res.end();
                },
              };

              try {
                const { default: handler } =
                  await import("./api/analyze-symptoms.js");
                await handler(req, wrappedRes);
              } catch (err) {
                console.error("[api-middleware]", err);
                if (!res.headersSent) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify({ success: false, error: err.message }),
                  );
                }
              }
            });
          });
        },
      },
    ],
  };
});
