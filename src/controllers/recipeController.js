import { getRecipes, countRecipes, searchRecipes } from "../models/recipeModel.js";

export const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const data = await getRecipes(limit, offset);
    const total = await countRecipes();

    res.json({ page, limit, total, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchRecipesController = async (req, res) => {
  try {
    const filters = {};

    if (req.query.title) filters.title = req.query.title;
    if (req.query.cuisine) filters.cuisine = req.query.cuisine;

    const parseOpVal = (str) => {
      const match = str.match(/(<=|>=|=|<|>)(\d+)/);
      if (!match) return null;
      return { operator: match[1], value: parseInt(match[2]) };
    };

    if (req.query.rating) filters.rating = parseOpVal(req.query.rating);
    if (req.query.total_time) filters.total_time = parseOpVal(req.query.total_time);
    if (req.query.calories) filters.calories = parseOpVal(req.query.calories);

    const data = await searchRecipes(filters);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
