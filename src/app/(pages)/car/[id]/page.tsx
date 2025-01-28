import CarInfo from "@/app/components/detail/car-info";
import Gallery from "@/app/components/detail/gallery";
import Recomendation from "@/app/components/detail/recomendation";
import { getCar } from "@/app/utils/service";
import React from "react";

interface DetailProps {
  params: Promise<{ id: string }>;
}

const Detail: React.FC<DetailProps> = async ({ params }) => {
  const { car } = await getCar((await params).id);
  return (
    <div className="p-7 lg:px-10 text-black ">
      <div className="grid lg:grid-cols-2 mb-10 gap-10">
        <Gallery car={car} />
        <CarInfo car={car} />
      </div>
      <Recomendation />
    </div>
  );
};

export default Detail;
