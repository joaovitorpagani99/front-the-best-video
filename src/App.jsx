import './App.css'
import { AuthProvider } from './context/auth';
import RouterApp from './Routes/index';

function App() {

  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  )
}

export default App
