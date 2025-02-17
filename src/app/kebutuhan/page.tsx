import React from "react";
import FormPerlengkapan from "./form-perlengkapan";
import Link from "next/link";

const page = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-center">
        <Link href={"/"}>Home</Link>
      </div>
      <div>
        <h1 className="text-xl font-bold text-center mt-4">
          KEBUTUHAN PERLENGKAPAN WIDODARI 1.3
        </h1>
      </div>
      <div className="p-4">
        <FormPerlengkapan />
      </div>
    </div>
  );
};

export default page;
