import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from './components/pages/SignIn';
import Signup from './components/pages/Signup';
import Profile from './components/main/profile';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

  );
}


export default App;
