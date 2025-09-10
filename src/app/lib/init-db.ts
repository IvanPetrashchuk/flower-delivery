// src/app/lib/init-db.ts

import Database from "better-sqlite3";
import path from "path";
import "dotenv/config";
import fs from "fs";
import { Flower, Shop } from "@app/lib/types";

const shops: Shop[] = [
  { id: 1, name: "Flowery Fragrant" },
  { id: 2, name: "Bloomwell" },
  { id: 3, name: "Petal & Stem" },
  { id: 4, name: "Greenery" },
  { id: 5, name: "Lush Flowers" },
];

const flowers: Flower[] = [
  { id: 1, name: "Rose", price: 8.88, imageUrl: "/images/rose.jpg", shopId: 1, dateAdded: new Date().toISOString() },
  { id: 2, name: "Tulip", price: 9.99, imageUrl: "/images/tulip.jpg", shopId: 1, dateAdded: new Date().toISOString() },
  { id: 3, name: "Lily", price: 7.88, imageUrl: "/images/lily.jpg", shopId: 1, dateAdded: new Date().toISOString() },
  { id: 4, name: "Daisy", price: 6.5, imageUrl: "/images/daisy.jpg", shopId: 2, dateAdded: new Date().toISOString() },
  {
    id: 5,
    name: "Sunflower",
    price: 10.25,
    imageUrl: "/images/sunflower.jpg",
    shopId: 2,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Orchid",
    price: 12.0,
    imageUrl: "/images/orchid.jpg",
    shopId: 3,
    dateAdded: new Date().toISOString(),
  },
  { id: 7, name: "Peony", price: 15.5, imageUrl: "/images/peony.jpg", shopId: 3, dateAdded: new Date().toISOString() },
  {
    id: 8,
    name: "Carnation",
    price: 5.75,
    imageUrl: "/images/carnation.jpg",
    shopId: 3,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Daffodil",
    price: 4.99,
    imageUrl: "/images/daffodil.jpg",
    shopId: 4,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Hydrangea",
    price: 11.0,
    imageUrl: "/images/hydrangea.jpg",
    shopId: 4,
    dateAdded: new Date().toISOString(),
  },
  { id: 11, name: "Iris", price: 8.0, imageUrl: "/images/iris.jpg", shopId: 4, dateAdded: new Date().toISOString() },
  {
    id: 12,
    name: "Lavender",
    price: 7.5,
    imageUrl: "/images/lavender.jpg",
    shopId: 5,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 13,
    name: "Marigold",
    price: 4.25,
    imageUrl: "/images/marigold.jpg",
    shopId: 5,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 14,
    name: "Gerbera",
    price: 6.9,
    imageUrl: "/images/gerbera.jpg",
    shopId: 5,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 15,
    name: "Dahlia",
    price: 9.5,
    imageUrl: "/images/dahlia.jpg",
    shopId: 1,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 16,
    name: "Snapdragon",
    price: 8.1,
    imageUrl: "/images/snapdragon.jpg",
    shopId: 1,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 17,
    name: "Freesia",
    price: 7.2,
    imageUrl: "/images/freesia.jpg",
    shopId: 2,
    dateAdded: new Date().toISOString(),
  },
  { id: 18, name: "Poppy", price: 6.0, imageUrl: "/images/poppy.jpg", shopId: 2, dateAdded: new Date().toISOString() },
  {
    id: 19,
    name: "Zinnia",
    price: 5.8,
    imageUrl: "/images/zinnia.jpg",
    shopId: 3,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 20,
    name: "Anemone",
    price: 9.15,
    imageUrl: "/images/anemone.jpg",
    shopId: 3,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 21,
    name: "Ranunculus",
    price: 10.5,
    imageUrl: "/images/ranunculus.jpg",
    shopId: 4,
    dateAdded: new Date().toISOString(),
  },
  { id: 22, name: "Aster", price: 5.45, imageUrl: "/images/aster.jpg", shopId: 4, dateAdded: new Date().toISOString() },
  {
    id: 23,
    name: "Crocus",
    price: 3.5,
    imageUrl: "/images/crocus.jpg",
    shopId: 5,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 24,
    name: "Gladiolus",
    price: 8.9,
    imageUrl: "/images/gladiolus.jpg",
    shopId: 5,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 25,
    name: "Chrysanthemum",
    price: 7.6,
    imageUrl: "/images/chrysanthemum.jpg",
    shopId: 1,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 26,
    name: "Foxglove",
    price: 9.75,
    imageUrl: "/images/foxglove.jpg",
    shopId: 2,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 27,
    name: "Gardenia",
    price: 14.5,
    imageUrl: "/images/gardenia.jpg",
    shopId: 3,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 28,
    name: "Cosmos",
    price: 6.2,
    imageUrl: "/images/cosmos.jpg",
    shopId: 4,
    dateAdded: new Date().toISOString(),
  },
  { id: 29, name: "Lilac", price: 11.2, imageUrl: "/images/lilac.jpg", shopId: 5, dateAdded: new Date().toISOString() },
  {
    id: 30,
    name: "Peruvian Lily",
    price: 8.7,
    imageUrl: "/images/peruvianlily.jpg",
    shopId: 1,
    dateAdded: new Date().toISOString(),
  },
  {
    id: 31,
    name: "Larkspur",
    price: 7.9,
    imageUrl: "/images/larkspur.jpg",
    shopId: 2,
    dateAdded: new Date().toISOString(),
  },
  { id: 32, name: "Pansy", price: 5.1, imageUrl: "/images/pansy.jpg", shopId: 3, dateAdded: new Date().toISOString() },
].map((flower) => {
  if ([1, 5, 8, 12, 17, 20, 25, 29].includes(flower.id)) {
    return { ...flower, isFavorite: true };
  }
  return flower;
});

async function setupDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not defined in .env file!");
    process.exit(1);
  }

  const dbDir = path.dirname(dbUrl);
  let db: Database.Database | null = null;

  try {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new Database(dbUrl, { verbose: console.log });

    db.exec(`
      CREATE TABLE IF NOT EXISTS shops (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS flowers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        imageUrl TEXT,
        shopId INTEGER NOT NULL,
        dateAdded TEXT NOT NULL, 
        FOREIGN KEY (shopId) REFERENCES shops(id)
      );
    `);

    const insertShop = db.prepare("INSERT OR IGNORE INTO shops (id, name) VALUES (?, ?)");
    db.transaction(() => {
      for (const shop of shops) {
        insertShop.run(shop.id, shop.name);
      }
    })();
    console.log("Shops data inserted.");

    const insertFlower = db.prepare(
      "INSERT OR IGNORE INTO flowers (id, name, price, imageUrl, shopId, dateAdded) VALUES (?, ?, ?, ?, ?, ?)"
    );
    db.transaction(() => {
      for (const flower of flowers) {
        insertFlower.run(flower.id, flower.name, flower.price, flower.imageUrl, flower.shopId, flower.dateAdded);
      }
    })();
    console.log("Flowers data inserted.");
  } catch (error) {
    console.error("Database setup failed:", error);
  } finally {
    if (db) {
      db.close();
    }
  }
}

setupDatabase();