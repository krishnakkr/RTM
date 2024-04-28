import React from "react";
// import main_bg from "../assets/images/main_page_bg.jpg";
import mainBackGround from "../../assets/Images/mainBackGround.jpg"
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
//   const aaa = {
//     backgroundImage: `url(${main_bg})`,
//   };

  return (
    <div
      className="sm:block  bg-custom items-center min-h-screen  bg-no-repeat bg-cover  "
      style={{ backgroundColor: "black" }}
    >
      <Outlet />
      {/* <div className="text-white text-[1.5rem] ml-[8rem]  ">Nikhil Kumar V</div> */}
      <style>
        {`
          @media (min-width: 640px) {
            .bg-custom {
              background-image: url(${mainBackGround});
            }
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout;