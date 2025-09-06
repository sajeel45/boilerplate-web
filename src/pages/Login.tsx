import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLoginAsyncThunk } from "../redux/pagesSlices/authSlice";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.auth.loadings?.userLoginAsyncThunk);
  const navigate  = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = () => {
    console.log("Form submitted");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const handleLogin = () => {
  dispatch(
    userLoginAsyncThunk({
      email: formik.values.email,
      password: formik.values.password,
    })
  );
};
  return (
    <div className="sign-up-page">
      <div className="sign-up-form">
        <div className="form-header">
          <h1>Login</h1>
        </div>
        <div className="input-fields-section">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="sign-up-button">
              <button
                onClick={handleLogin}
                type="submit"
                className="btn-style registration"
              >
                {loading ? <Spinner size="sm" /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
