import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Home from "./pages/Home";
import GlobalModals from "./components/GlobalModals";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoaderComponent from "./components/LoaderComponent";
import { useEffect } from "react";
import { authenticateAsyncThunk } from "./redux/pagesSlices/authSlice";
import Authenticated from "./layouts/authenticate";
import UnAuthenticated from "./layouts/UnAutheticated";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s?.auth?.loadings?.authenticateAsyncThunk);
  useEffect(() => {
    dispatch(authenticateAsyncThunk());
  }, [dispatch]);
  if (loading) return <LoaderComponent />;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authenticated element={<Home />} />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route
            path="/signup"
            element={<UnAuthenticated element={<Signup />} />}
          />
          <Route
            path="/login"
            element={<UnAuthenticated element={<Login />} />}
          />
        </Routes>
        <GlobalModals />
      </BrowserRouter>
    </>
  );
}

export default App;
