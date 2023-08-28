import React from "react";
import errorImage from "../Assets/warning.png";

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center text-red-500 text-center pt-5">
      <img src={errorImage} alt="errorIcon" className="w-20 h-auto" />
      <h1 className="pt-4">Hmm, double-check the symbol.</h1>
    </div>
  );
};
