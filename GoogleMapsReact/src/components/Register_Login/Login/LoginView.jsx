import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginView = ({ formData, setFormData,setLogin }) => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    user: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [showError, setShowError] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    if( (formData?.user?.name !== loginFormData?.user?.name || formData?.user?.password !== loginFormData?.user?.password) ||
    (!loginFormData?.user?.name || !loginFormData?.user?.password) )
     {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLogin(false);
    window.location.href = "/main";
  };

  return (
    <>
      <div className=" max-h-full w-1/2  text-center flex flex-col min-h-screen justify-center items-center ">
        <form onSubmit={loginUser}>
          <div className="w-[400px] h-[450px] rounded-[2rem] bg-black flex flex-col space-y-4 items-center justify-center ">
            <div className="flex justify-start mt-[1rem]">
              <div className=" rounded-lg ml-[-10rem]  w-[4rem] h-[4rem]"></div>
              <div className="text-[3rem] w-[4rem] h-[4rem] text-white">
                Welcome
              </div>
            </div>
            <span className="text-white text-[35px] my-6">Login</span>
            <input
              className="border-red-300 border-5 px-6 py-2
                  rounded-lg"
              type="text"
              //   value={user.name}
              placeholder="Enter your username"
              value={loginFormData.user?.name}
              onChange={(e) => {
                setLoginFormData((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    name: e.target.value,
                  },
                }));
              }}
            ></input>
            <input
              className="border-red-300 border-5 px-6 py-2
                  rounded-lg text-black"
              type="password"
              placeholder="Enter your password"
              value={loginFormData.user?.password}
              onChange={(e) => {
                setLoginFormData((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    password: e.target.value,
                  },
                }));
              }}
            ></input>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-white hover:text-black  text-black px-6 py-2 rounded-2xl"
            >
              Login
            </button>
            <span className="text-white">
              {" "}
              Dont have a account?{" "}
              <Link to="/register" className="text-red-500 hover:text-blue-500">
                SignUp
              </Link>
            </span>
          </div>
        </form>
        {showError && (
          <div className="text-[1rem] bg-white mt-1  text-red-400 border-2 w-[24rem] h-[2rem] flex-col flex rounded-2xl justify-center">
            <span>Invalid username or password</span>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginView;
