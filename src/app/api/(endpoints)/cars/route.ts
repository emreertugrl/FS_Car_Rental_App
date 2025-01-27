import { NextResponse as Res } from "next/server";
import connectMongo from "../../utils/connectMongo";
import Car from "../../models/Car";

export async function GET() {
  try {
    await connectMongo();
    const cars = await Car.find();

    return Res.json({ cars }, { status: 200 });
  } catch (error) {
    return Res.json({ message: "Araç verileri alınamadı" }, { status: 500 });
  }
}
