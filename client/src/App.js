import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import Logout from "./components/Logout/Logout";
import Add from "./components/Card/Add/Add";
import Catalog from "./components/Catalog/Catalog";
import Users from "./components/Users/Users";
import Contacts from "./components/Contact/Contacts";
import LogginGuard from "./common/logginGuard";

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>

          <Route path="/add" element={<Add />}></Route>
        <Route element={<LogginGuard />}>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
