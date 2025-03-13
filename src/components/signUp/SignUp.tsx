import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { User } from "../../contexts/User";
import { SignUpProps } from "../../types/views/SignUpProps";
import { assets } from "../../assets/assets";
import signUpValidationSchema from "../../types/validations/SignUpValidationSchema";
import "./SignUp.css";

const SignUp: React.FC<SignUpProps> = ({ setShowSignUp }) => {
  const authenticationContext = useContext(AuthenticationContext);
  if (!authenticationContext) {
    toast.error("AuthenticationContext is not available");
    return <strong>AuthenticationContext is not available</strong>;
  }
  const { user, login, logout } = authenticationContext;
  const initialValues: User = {
    firstname: "",
    lastname: "",
    username: "",
  };
  const handleSubmit = (values: User) => {
    login(values);
    toast.success("Account created successfully!");
    setShowSignUp(false);
  };
  const handleLogout = () => {
    toast.dismiss();
    toast.info("You have been logged out successfully!");
    setTimeout(() => {
      logout();
      setShowSignUp(false);
    }, 1000);
  };
  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <div className="sign-up-title">
          <h2>{user ? `Welcome, ${user.firstname}` : "Sign Up"}</h2>
          <img onClick={() => setShowSignUp(false)} src={assets.crossIcon} alt="close" />
        </div>
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="sign-up-form">
                <div className="sign-up-inputs">
                  <Field type="text" name="firstname" placeholder="First name" />
                  <ErrorMessage name="firstname" component="div" className="error-message" />

                  <Field type="text" name="lastname" placeholder="Last name" />
                  <ErrorMessage name="lastname" component="div" className="error-message" />

                  <Field type="text" name="username" placeholder="Username" />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>
                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default SignUp;
