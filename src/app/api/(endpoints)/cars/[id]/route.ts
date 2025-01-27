import Car from "@/app/api/models/Car";
import connectMongo from "@/app/api/utils/connectMongo";
import { NextResponse as Res } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const car = await Car.findById((await params).id); // promise yapısında olduğu için id'yi await ile bekleriz

    if (!car) return Res.json({ message: "Araç bulunamadı" }, { status: 404 });
    return Res.json({ car });
  } catch (error) {
    return Res.json({ message: "Id'si bilinen araç verileri alınamadı" }, { status: 500 });
  }
}
