import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../pages/Landing";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { AdminAmas } from "../pages/AdminAmas";
import { Toaster } from "react-hot-toast";
import { CreateAmas } from "../pages/CreateAmas";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/see-ama" element={<AdminAmas></AdminAmas>}></Route>
        <Route path="/post-ama/:id" element={<CreateAmas></CreateAmas>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
