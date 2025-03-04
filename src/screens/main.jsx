import React from "react";
import Appbar from "../components/appbar";
import RightContentMainPage from "../components/rightContentMainPage";
import SaveButton from "../components/saveButton";

const Main = () => {
  return (
    <div className="w-screen h-full flex flex-col gap-3 bg-[#f5f7fa]">
      <Appbar />
      <SaveButton />
      <RightContentMainPage />
    </div>
  );
};

export default Main;
