import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home/home";
import Signin from "../pages/Signin/sigin";
import Signup from "../pages/Signup/signup";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Menu from "../components/navBar/navBar";
import Vote from "../pages/Vote/Vote";
import AddVideo from "../pages/AddVideo/AddVideo";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

const Private = ({ Item, adminOnly }) => {
  const { signed, user } = useAuth();
  if (!signed) return <Signin />;
  if (adminOnly && !user?.isAdmin) return <Home />;
  return <Item />;
};

Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
  adminOnly: PropTypes.bool,
};

const RouterApp = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed && <Menu />}
      <Routes>
        <Route path="/dashboard" element={<Private Item={Home} />} />
        <Route path="/vote" element={<Private Item={Vote} />} />
        <Route
          path="/addVideo"
          element={<Private Item={AddVideo} adminOnly />}
        />
        <Route
          path="/admin"
          element={<Private Item={AdminDashboard} adminOnly />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
