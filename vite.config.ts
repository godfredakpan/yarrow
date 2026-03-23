import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import {
  confirmationToResponse,
  parseConfirmationBody,
  sendConfirmationEmail,
} from "./server/contactConfirmationResend";

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Dev-only: mirrors production POST /api/send-contact-confirmation (Resend). Set RESEND_API_KEY in .env */
function contactConfirmationDevApi(env: Record<string, string>): Plugin {
  return {
    name: "contact-confirmation-dev-api",
    configureServer(server) {
      server.middlewares.use(
        async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const url = req.url?.split("?")[0];
          if (url !== "/api/send-contact-confirmation" || req.method !== "POST") {
            next();
            return;
          }
          try {
            const raw = await readRequestBody(req);
            let json: unknown;
            try {
              json = JSON.parse(raw);
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid JSON" }));
              return;
            }
            const body = parseConfirmationBody(json);
            if (!body) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid payload" }));
              return;
            }
            const result = await sendConfirmationEmail(body, {
              RESEND_API_KEY: env.RESEND_API_KEY,
              RESEND_FROM: env.RESEND_FROM,
            });
            const response = confirmationToResponse(result);
            res.statusCode = response.status;
            const ct = response.headers.get("content-type");
            if (ct) res.setHeader("Content-Type", ct);
            res.end(await response.text());
          } catch (e) {
            next(e);
          }
        }
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), contactConfirmationDevApi(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
