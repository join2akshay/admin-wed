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
import Query from './admin/Query';
import { AdminAxios, BaseAxios } from './actions/utils';
import { useEffect } from 'react';


function App() {
  const baseHit=()=>{
    BaseAxios.get('/').then((res)=>res)
  }
  useEffect(() => {
    baseHit()
  }, [])

// TODO: Replace the following with your app's Firebase project configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyC0pNqht8hJfRZok7OtVeo_e7KqClZa7No",
  //   authDomain: "wedppy-dc873.firebaseapp.com",
  //   databaseURL: "https://wedppy-dc873-default-rtdb.firebaseio.com",
  //   projectId: "wedppy-dc873",
  //   storageBucket: "wedppy-dc873.appspot.com",
  //   messagingSenderId: "154550005722",
  //   appId: "1:154550005722:web:6afdc1479d74ecdc32dae3",
  //   measurementId: "G-Q3W1JQJ930"
  // };

  // const app = initializeApp(firebaseConfig);
  // const db = getDatabase(app);
  // const auth = getAuth()

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
          <Route path="/query" element={<Query />} />



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
// export { auth, db };
