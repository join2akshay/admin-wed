import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./admin";
import ItemList from "./admin/itemList";
import SubcategoryList from "./admin/subcategoryList";
import CategoryListAdmin from "./admin/categoryList";
import { ToastContainer } from "react-toastify";
import UserList from './admin/userList';
import Login from './admin/Login';
import Header from './Nav';
import VendorList from './admin/vendor';
import OrderList from './admin/order';
import { initializeApp } from 'firebase/app';


function App() {


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMZChI2Ug2ooBtYLZGvUWnARiSYBfL3Bk",
  authDomain: "wedppy-b847b.firebaseapp.com",
  projectId: "wedppy-b847b",
  storageBucket: "wedppy-b847b.appspot.com",
  messagingSenderId: "403926762766",
  appId: "1:403926762766:web:1db62a8e0305a1d1d1c35f"
};

const app = initializeApp(firebaseConfig);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Loader /> */}
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/admin" element={<Admin />} >
          </Route>
          <Route path="/item" element={<ItemList />} />
          <Route path="/vendor" element={<VendorList />} />
          <Route path="/order" element={<OrderList />} />


          <Route path="/user" element={<UserList />} />

          <Route path="/category" element={<CategoryListAdmin />} />
          <Route path="/subcategory" element={<SubcategoryList />} />



          {/* <Route path="/*" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
}

export default App;


const ProtectedRoute = ({
  user,
  redirectPath = '/',
  children,
}) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
