"use client";

import { ICar } from "@/app/api/models/Car";
import { getPaymentUrl } from "@/app/utils/service";
import { FC, useState } from "react";
import Loader from "../loader";

type Props = {
  car: ICar;
};

const RentButton: FC<Props> = ({ car }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRent = async () => {
    await getPaymentUrl(car)
      .then((url) => (window.location.href = url))
      .finally(() => setIsLoading(false));
  };

  return (
    <button
      onClick={handleRent}
      className="min-w-36 bg-basic-blue py-2 px-6 text-white rounded-md hover:brightness-90 transition"
    >
      {isLoading ? <Loader /> : "Şimdi Kirala"}
    </button>
  );
};

export default RentButton;
