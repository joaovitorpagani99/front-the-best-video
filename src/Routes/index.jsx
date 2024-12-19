import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home/home";
import Signin from "../pages/Signin/sigin";
import Signup from "../pages/Signup/signup";
import { useContext } from "react";
import { authContext } from "../context/auth";


const Private = ({ Item }) => {
  const { signed } = useContext(authContext);
  return signed ? <Item /> : <Signin />;
};

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="**" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}


export default RouterApp;