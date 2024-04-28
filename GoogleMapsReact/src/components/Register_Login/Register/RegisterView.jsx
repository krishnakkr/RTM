import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginView = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const signupUser = async (e) => {
    e.preventDefault();

    if(!formData.user?.name || !formData.user?.email || !formData.user?.password)
    {
      setShowError(true);
      return;
    }
    setShowError(false);
    navigate("/login")
  };

  return (
    <>
      <div className=" max-h-full w-1/2  text-center flex flex-col min-h-screen justify-center items-center ">
        <form onSubmit={signupUser}>
          <div className="w-[400px] h-[500px] rounded-[2rem] bg-black flex flex-col space-y-4 items-center justify-center ">
            <div className="flex justify-start ">
              <div className=" rounded-lg ml-[-10rem]  w-[4rem] h-[4rem]"></div>
              <div className="text-[3rem] w-[4rem] h-[4rem] text-white">
                Welcome
              </div>
            </div>
            <span className="text-white text-[35px] my-6">Register</span>
            <input
              className="border-red-300 border-5 px-6 py-2
                  rounded-lg"
              type="text"
              placeholder="Enter your username"
              value={formData.user?.name}
              onChange={(e) => {
                setFormData((prev) => ({
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
                  rounded-lg"
              type="text"
              placeholder="Enter your email"
              value={formData.user?.email}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    email: e.target.value,
                  },
                }));
              }}
            ></input>
            <input
              className="border-red-300 border-5 px-6 py-2
                  rounded-lg text-black"
              type="password"
              placeholder="Enter your password"
              value={formData.user?.password}
              onChange={(e) => {
                setFormData((prev) => ({
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
              SignUp
            </button>
            <span className="text-white">
              {" "}
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
        {showError && (!formData?.user?.name || !formData?.user?.email || !formData?.user?.password ) && (
          <div className="text-[1rem] bg-white mt-1  text-red-400 border-2 w-[24rem] flex-col flex rounded-2xl justify-center">
            <div className="flex-col flex mt-1 mb-1">
            {!formData?.user?.name && <span>Enter Valid user name</span>}
            {!formData?.user?.email && <span>Enter Valid email</span>}
            {!formData?.user?.password && <span>Enter Valid password</span>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginView;
