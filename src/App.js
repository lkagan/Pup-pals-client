import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";

//components
import NavBar from "./components/Navbar/Navbar";
import DogForm from "./components/DogForm";
import UserForm from "./components/UserForm";

//pages
import Login from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import DogProfile from "./pages/DogProfile";
import Signup from "./pages/Signup";
import AddDog from "./pages/AddDog";
import CreateUser from "./pages/CreateUser";
import Search from "./pages/Search";
import MyMatches from "./pages/MyMatches";

//providers
import { UserProvider } from "./contexts/UserContext";
import { DogProvider } from "./contexts/DogContext";
import ProtectedRoute from "./routeGuard/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapping our entire App here, so that we can use context values anywhere (components, pages) */}
      <UserProvider>
        <DogProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="user/:id" element={<UserProfile />} />
                <Route path="dog/:id" element={<DogProfile />} />
                <Route path="adddog" element={<AddDog />} />
              <Route path="createuser" element={<CreateUser />} />
              <Route path="search" element={<Search />} />
              <Route path="mymatches" element={<MyMatches />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </div>
        </DogProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
