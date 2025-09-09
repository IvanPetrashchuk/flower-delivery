import db from './db';
import { Flower, Shop } from './types';

export async function getShops(): Promise<Shop[]> {
  const shops = db.prepare('SELECT id, name FROM shops').all() as Shop[];
  return shops;
}

export async function getFlowersByShop(shopId: number): Promise<Flower[]> {
  const flowers = db.prepare('SELECT * FROM flowers WHERE shopId = ?').all(shopId) as Flower[];
  return flowers;
}

export async function getAllFlowers(): Promise<Flower[]> {
  const flowers = db.prepare('SELECT * FROM flowers').all() as Flower[];
  return flowers;
}