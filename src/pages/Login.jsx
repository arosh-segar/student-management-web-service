import { CircularProgress, Snackbar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { useAuth } from "../auth";
import { login } from "../constants/api";

const Login = () => {
  const { assignToken } = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const [errorMsg, setErrorMsg] = useState("");

  const { isLoading, isPending, mutate, isError } = useMutation({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (loginData) => {
      cookies.set("accessToken", loginData?.data?.token);
      assignToken(loginData?.data?.token);
      navigate("/subjects");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please fill the username"),
      password: Yup.string()
        .min(8, "Password must be at least 6 characters")
        .required("Please fill the password"),
    }),
    onSubmit: (values) => {
      mutate({ username: values.username, password: values.password });
    },
  });

  return (
    <section className="h-screen">
      <div className="flex h-screen w-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-blue-200">
        <div className="bg-white w-4/12 p-10 rounded-md shadow-md">
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isError}
            message={errorMsg}
            key={"top" + "center"}
            autoHideDuration={1200}
          />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto rounded-full"
              src="https://www.pngfind.com/pngs/m/202-2029636_reading-books-logo-png-transparent-png.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <span className="text-red-500">
                      {formik.errors.username}
                    </span>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className="text-red-500">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading || isPending ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="flex items-center justify-center mt-5">
                  {`Don't have an account`}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline ml-1"
                  >
                    Register
                  </Link>
                  ?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
