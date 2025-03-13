import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  username: Yup.string()
    .required("Username is required")
    .max(32, "Username cannot exceed 50 characters"),
});

export default signUpValidationSchema;
