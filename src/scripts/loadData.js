// src/scripts/loadData.js
import fs from "fs";
import { Pool } from "pg";
import dotenv from "dotenv";
import JSON5 from "json5"; 
import waitPort from "wait-port"; 

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const filePath = "./US_recipes.json";

async function loadData() {
  try {

    await waitPort({ host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT) });

    console.log("Reading JSON file...");
    const rawData = fs.readFileSync(filePath, "utf-8");

    
    const jsonData = JSON5.parse(rawData);

    let insertedCount = 0;
    let skippedCount = 0;

    for (let key in jsonData) {
      const recipe = jsonData[key];

      
      if (!recipe.title) {
        console.warn(`Skipping recipe at key=${key} due to missing title`);
        skippedCount++;
        continue;
      }

     
      const rating = !isNaN(parseFloat(recipe.rating)) ? parseFloat(recipe.rating) : null;
      const prep_time = !isNaN(parseInt(recipe.prep_time)) ? parseInt(recipe.prep_time) : null;
      const cook_time = !isNaN(parseInt(recipe.cook_time)) ? parseInt(recipe.cook_time) : null;
      const total_time = !isNaN(parseInt(recipe.total_time)) ? parseInt(recipe.total_time) : null;

      const nutrients = recipe.nutrients ? JSON.stringify(recipe.nutrients) : null;

      const query = `
        INSERT INTO recipes
        (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT DO NOTHING
      `;

      await pool.query(query, [
        recipe.cuisine || null,
        recipe.title,
        rating,
        prep_time,
        cook_time,
        total_time,
        recipe.description || null,
        nutrients,
        recipe.serves || null,
      ]);

      insertedCount++;
    }

    console.log(`Data loaded successfully! Inserted: ${insertedCount}, Skipped: ${skippedCount}`);
    await pool.end();
  } catch (err) {
    console.error("Error loading data:", err);
    process.exit(1);
  }
}

loadData();
