import { ICar } from "../api/models/Car";

const API_URL = process.env.API_URL;

type getCarsRes = Promise<{ cars: ICar[] }>;
export const getCars = async (): getCarsRes => {
  const res = await fetch(`${API_URL}/api/cars`);
  if (!res.ok) {
    throw new Error(`Araç verileri alınamadı.`);
  }
  return res.json();
};

type getCarRes = Promise<{ car: ICar }>;
export const getCar = async (id: string): getCarRes => {
  const res = await fetch(`${API_URL}/api/cars/${id}`);
  if (!res.ok) {
    throw new Error(`Araç verisi alınamadı.`);
  }
  return res.json();
};
