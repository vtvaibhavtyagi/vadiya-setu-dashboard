import React from "react";
import Feature from "./Feature";

function Experience() {
  return (
    <div className="experience flex flex-col items-center justify-start px-[5rem] bg-[#47B5FF] h-[60rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
{/*       
      {/* <img src={require("../img/Path 318.png")} alt="" className="w-[5rem]" /> */}
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem] ">
        <span><b>An Amazing App That Can Change Your Daily Life</b></span>
        <span>
         
        </span>
      </div>
      {/* features  */}
      <div className="feature flex items-center justify-around mt-[6rem] w-[75rem] w-[100%]">
        <Feature icon="Group 2" title="For Privacy" /> 
        
        <Feature icon="music icon" title="Easy Accessibility" />
        <Feature icon="Group 4" title="For Your Health" />
       
        {/* /* <span className="feature flex items-center">
         /* Your personal health records are not shared with anyone untill you choose to! */
        //  </span> */ */}
      }

      </div>
      <div >Get All Your Records Consolidated In One App With Our Best Ever User Interface</div>
      <div>This App keeps all the information about your health for you to be Carefree.</div>
    </div>
  );
}

export default Experience;
