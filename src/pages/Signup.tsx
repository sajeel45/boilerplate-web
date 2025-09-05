import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userRegisterAsyncThunk } from "../redux/pagesSlices/authSlice";
import { toast } from "react-toastify";

export default function Signup() {
  // validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const dispatch = useDispatch();
  // form submission handler
  const handleSubmit = () => {
    dispatch(
      userRegisterAsyncThunk({
        data: { ...formik.values },
        callBack: () => {
          toast.success("Registered Successfully!");
        },
      })
    );
  };
  //   formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="sign-up-page">
      <div className="sign-up-form">
        <div className="form-header">
          <h1>Sign up</h1>
        </div>
        <div className="input-fields-section">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="input-field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
            <div className="input-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your phone number"
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error-message">{formik.errors.phone}</div>
            ) : null}
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
            <div className="sign-up-button">
              <button type="submit" className="btn-style registration">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
