import express from "express";
import {
  getAllRecipes,
  searchRecipesController,
} from "../controllers/recipeController.js";

const router = express.Router();

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes (paginated, sorted by rating desc)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/", getAllRecipes);

/**
 * @swagger
 * /api/recipes/search:
 *   get:
 *     summary: Search recipes with filters
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Partial title match
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Cuisine filter
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *         description: Rating filter (>=, <=, =)
 *       - in: query
 *         name: calories
 *         schema:
 *           type: string
 *         description: Calories filter (>=, <=, =)
 *       - in: query
 *         name: total_time
 *         schema:
 *           type: string
 *         description: Total time filter (>=, <=, =)
 *     responses:
 *       200:
 *         description: List of recipes matching search
 */
router.get("/search", searchRecipesController);

export default router;
