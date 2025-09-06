import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/LoaderComponent";

export default function Authenticated({ element }) {
  const { user, loadings, profile } = useSelector((s) => s?.auth);
  console.log("🚀 ~ Authenticated ~ user:", user);
  console.log("userdsfdsfd", profile);

  if (
    !Object.keys(loadings)?.includes("authenticateAsyncThunk") ||
    loadings?.authenticateAsyncThunk
  ) {
    return <LoadingComponent />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
}
