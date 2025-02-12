import React from "react";
import HashLoader from "react-spinners/HashLoader";

export default function ButtonComponent({ loading, btnText, onClick }) {
  return (
    <>
      <button
        disabled={loading}
        onClick={onClick}
        type="submit"
        className="mt-2 text-center bg_primary border-0 min-w-[8rem] lg:w-[12rem] py-2 lg:h-[3.3rem] md:w-[12rem] hover:scale-105 transform transition-all duration-300 ease-in-out rounded-md poppins_medium text_white md:text-lg"
      >
        {loading ? <HashLoader  className="mx-auto"   color="#fff" size={18} /> : btnText}
      </button>
    </>
  );
}
