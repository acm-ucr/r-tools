import React from "react";
import Image from "next/image";
import Link from "next/link";
import Error from "../Assets/Error.svg";
const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-min-screen justify-between items-center">
      <div className="flex items-center flex-col gap-4 w-full text-rtools-green">
        <div className="flex flex-cols text-center text-9xl font-bold gap-3">
          404
          <Image src={Error} alt="Error.svg" className="w-2/5" />
        </div>
        <div className="text-center text-3xl">
          Uh oh it seems like this page doesn{"'"}t exist yet {":("}
        </div>
        <Link
          as={Link}
          href="/"
          className="rounded-full text-xl bg-rtools-green text-rtools-blue-400 w-1/2 md:w-1/6 text-center no-underline px-3 py-3 font-bold hover:scale-110 duration-300"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
