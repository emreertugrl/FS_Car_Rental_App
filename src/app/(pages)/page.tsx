import React from "react";
import Hero from "../components/hero";
import { getCars } from "../utils/service";
import Card from "../components/card";
import { ICar } from "../api/models/Car";

const Home: React.FC = async () => {
  const { cars } = await getCars();
  return (
    <div>
      <Hero />
      <h1 className="text-zinc-400 font-semibold mt-10 mb-5 text-xl">Popüler Araçlar</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cars.map((car: ICar) => (
          <Card key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;
