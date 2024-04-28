import React, { useState } from "react";
import GoogleMapView from "./components/Map/GoogleMapView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./components/Register_Login/Register/RegisterView";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register_Login_NavBar from "./components/Register_Login/Register_Login_NavBar";
import LoginView from "./components/Register_Login/Login/LoginView";
import AuthLayout from "./components/Register_Login/AuthLayout";


const App = () => {

  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [login,setLogin] = useState(true);

  return (
    <BrowserRouter >
    <Register_Login_NavBar login={login} setLogin={setLogin}/>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<RegisterView formData={formData} setFormData={setFormData}/>} />
          <Route path="/register" element={<RegisterView formData={formData} setFormData={setFormData}/>} />
          <Route path="/login" element={<LoginView formData={formData} setFormData={setFormData} setLogin={setLogin}/>} />
        </Route>
        <Route path="/main" element={<GoogleMapView setLogin={setLogin} />}/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
