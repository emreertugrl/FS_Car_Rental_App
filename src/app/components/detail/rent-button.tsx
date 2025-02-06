"use client";

import { ICar } from "@/app/api/models/Car";
import { getPaymentUrl } from "@/app/utils/service";
import { FC } from "react";

type Props = {
  car: ICar;
};

const RentButton: FC<Props> = ({ car }) => {
  const handleRent = async () => {
    await getPaymentUrl(car).then((url) => (window.location.href = url));
  };

  return (
    <button
      onClick={handleRent}
      className="bg-basic-blue py-2 px-6 text-white rounded-md hover:brightness-90 transition"
    >
      Şimdi Kirala
    </button>
  );
};

export default RentButton;
