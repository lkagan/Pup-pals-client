import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';


//components
import NavBar from './components/Navbar/Navbar';
import DogForm from './components/DogForm';
import UserForm from './components/UserForm';

//pages
import Login from './pages/LogIn';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import DogProfile from './pages/DogProfile';
import Signup from './pages/Signup';
import AddDog from './pages/AddDog';
import CreateUser from './pages/CreateUser';




//providers
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './routeGuard/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapping our entire App here, so that we can use context values anywhere (components, pages) */}
      <UserProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="user/:id" element={<UserProfile />} />
                <Route path="dog/:id" element={<DogProfile />} />
               
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="adddog" element={<AddDog />} />
              <Route path="createuser" element={<CreateUser />} />
            </Routes>
          </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;