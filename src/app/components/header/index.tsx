import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaHeart } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";

const Header: React.FC = () => {
  return (
    <header className="bg-white flex justify-between py-5 px-7 lg:py-8 lg:px-10 items-center">
      <Link href={"/"}>
        <h1 className="text-basic-blue font-bold text-2xl lg:text-4xl">DRIVE</h1>
      </Link>
      <form className="flex gap-2 py-2 px-4 rounded-full border border-zinc-300 md:w-1/2">
        <button className="text-zinc-700 text-xl">
          <CiSearch />
        </button>
        <input type="text" className="outline-none text-zinc-800" placeholder="Bir marka aratın" />
      </form>

      <div className="flex items-center gap-3">
        <div className="max-md:hidden p-2 border border-zinc-600 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition">
          <FaHeart />
        </div>
        <div className="max-md:hidden p-2 border border-zinc-600 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition">
          <FaBell />
        </div>
        <div className="p-2 border border-zinc-600 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition text-lg">
          <RiSettings4Fill />
        </div>
        <div className="flex items-center">
          <Image
            alt="profile pic"
            src={"/profile.jpg"}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
