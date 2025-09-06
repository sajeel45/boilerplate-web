import { useNavigate } from "react-router-dom";
import { userLogoutAsyncThunk } from "../redux/pagesSlices/authSlice";
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogoutAsyncThunk({}));
    };

    return(
        <header className="header">
            <div className="logo">
                <h1>Book Management</h1>
            </div>
            <div className="btn-style logout-button">
                <button onClick={handleLogout} >Logout</button>
            </div>
        </header>
    )
}