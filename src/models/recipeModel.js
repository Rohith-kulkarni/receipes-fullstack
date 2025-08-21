import pool from "../config/db.js";

export const insertRecipe = async (recipe) => {
  const query = `
    INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;
  const values = [
    recipe.cuisine,
    recipe.title,
    recipe.rating ?? null,
    recipe.prep_time ?? null,
    recipe.cook_time ?? null,
    recipe.total_time ?? null,
    recipe.description,
    recipe.nutrients,
    recipe.serves
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getRecipes = async (limit, offset) => {
  const { rows } = await pool.query(
    `SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
};

export const countRecipes = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM recipes`);
  return parseInt(rows[0].count, 10);
};

export const searchRecipes = async (filters) => {
  let query = `SELECT * FROM recipes WHERE 1=1`;
  let values = [];
  let idx = 1;

  if (filters.title) {
    query += ` AND title ILIKE $${idx++}`;
    values.push(`%${filters.title}%`);
  }
  if (filters.cuisine) {
    query += ` AND cuisine ILIKE $${idx++}`;
    values.push(`%${filters.cuisine}%`);
  }
  if (filters.rating) {
    query += ` AND rating ${filters.rating.operator} $${idx++}`;
    values.push(filters.rating.value);
  }
  if (filters.total_time) {
    query += ` AND total_time ${filters.total_time.operator} $${idx++}`;
    values.push(filters.total_time.value);
  }
  if (filters.calories) {
    query += ` AND (nutrients->>'calories')::int ${filters.calories.operator} $${idx++}`;
    values.push(filters.calories.value);
  }

  const { rows } = await pool.query(query, values);
  return rows;
};
