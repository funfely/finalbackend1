import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import "./config/db.js";
import viewsRouter from "./routes/views.router.js";

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   HANDLEBARS
========================= */
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   ROUTES
========================= */
app.use("/", viewsRouter);

/* =========================
   EXPORT
========================= */
export default app;
