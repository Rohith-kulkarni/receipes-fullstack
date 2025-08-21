import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import recipeRoutes from "./routes/recipeRoutes.js"; // your routes
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

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
      {
        url: "http://localhost:" + (process.env.PORT || 8000),
      },
    ],
  },
  apis: ["./src/routes/*.js"], // <-- Make sure this path points to your routes folder
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------- Routes ----------
app.use("/api/recipes", recipeRoutes);

// ---------- Start Server ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

export default app;
