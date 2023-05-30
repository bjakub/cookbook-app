import * as yup from "yup";

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .required("This field is required!")
    .email("This field must be email!"),
  password: yup.string().required("This field is required!"),
});
