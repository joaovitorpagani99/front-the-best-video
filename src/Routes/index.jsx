import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home/home";
import Signin from "../pages/Signin/sigin";
import Signup from "../pages/Signup/signup";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Menu from "../components/navBar/navBar";
import Vote from "../pages/Vote/Vote";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Signin />;
};

Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

const RouterApp = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed && <Menu />}
      <Routes>
        <Route path="/dashboard" element={<Private Item={Home} />} />
        <Route path="/vote" element={<Private Item={Vote} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
