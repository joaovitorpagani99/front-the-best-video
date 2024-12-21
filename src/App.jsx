import "./App.css";
import { AuthProvider } from "./context/auth";
import RouterApp from "./Routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <RouterApp />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
