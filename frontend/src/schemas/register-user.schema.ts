import * as yup from "yup";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .required("This field is required!")
    .email("This field must be email!"),
  password: yup.string().required("This field is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], `Passwords do not match each other!`)
    .required("This field is required!"),
  name: yup.string().required("This field is required!"),
});
