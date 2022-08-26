import React from "react";
import CenterMenu from "./CenterMenu";

function Header() {
  const buttonStyle =
    "border-[2px] rounded-[10px] bg-[#1363DF] border-[#0000] px-[25px] py-[7px]";
  return (
    <div className="header bg-[#DFF6FF] flex items-center justify-between px-[5rem] pt-[2.4rem] text-[0.8rem]">

      <img
        src={require("./img/logo.png")}
        alt=""
        className="logo  w-[100px] h-[100px]"
      />

      <div className="buttons flex border-[0px] rounded-[5px] ">
        <button className={`mr-[55px] hover:bg-[#232A4E] `} >
         <b>Log in </b> 
        </button>

      </div>
    </div>
  );
}

export default Header;
