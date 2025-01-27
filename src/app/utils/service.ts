import { ICar } from "../api/models/Car";

const API_URL = process.env.API_URL;

type getCarsRes = Promise<{ cars: ICar[] }>;
export const getCars = async () => {
  const res = await fetch(`${API_URL}/api/cars`);
  if (!res.ok) {
    throw new Error(`Araç verileri alınamadı.`);
  }
  return res.json();
};
