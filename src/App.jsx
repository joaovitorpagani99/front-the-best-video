import "./App.css";
import { AuthProvider } from "./context/auth";
import RouterApp from "./Routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function App() {
  return (
    <AuthProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RouterApp />
        <ToastContainer />
      </motion.div>
    </AuthProvider>
  );
}
export default App;
