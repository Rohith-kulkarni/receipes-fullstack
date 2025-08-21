import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import recipeRoutes from "./routes/recipeRoutes.js"; // your routes
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());
// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));

// ---------- Swagger Setup ----------
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipes API",
      version: "1.0.0",
      description: "API documentation for Recipes service",
    },
    servers: [
      { url: "/" }, // relative URL works for local & Railway
    ],
  },
  apis: ["./src/routes/*.js"], // points to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------- Routes ----------
app.use("/api/recipes", recipeRoutes);

// ---------- Start Server ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  const publicUrl = process.env.RAILWAY_STATIC_URL || `http://localhost:${PORT}`;
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: ${publicUrl}/api-docs`);
});

export default app;
