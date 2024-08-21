import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Footer from './components/Footer';
import Navibar from './components/Navibar';
import Home from "./pages/Home";
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navibar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
          <Route path="/viewuser/:id" element={<ViewUser/>}/>
          <Route path="/edituser/:id" element={<EditUser/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
