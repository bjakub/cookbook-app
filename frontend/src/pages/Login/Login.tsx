import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormBox, LoginHeading } from "./Login.styled";
import { Alert, Snackbar, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import { loginUserAPI } from "../../api/loginUser.api";

export interface IFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("This field is required!")
    .email("This field must be email!"),
  password: yup.string().required("This field is required!"),
});

export const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(loginUserAPI, {
    onMutate: () => {
      setIsErrorVisible(false);
    },
    onSuccess: async (fetchData) => {
      const userData = await fetchData.json();

      if (!fetchData.ok) {
        if (userData.message) {
          setError(userData.message);
          return setIsErrorVisible(true);
        }

        setError("There is some problem. Let's try again soon.");
        return setIsErrorVisible(true);
      }

      window.localStorage.setItem(
        "user_token",
        JSON.stringify({
          access_token: userData.access_token,
          exp: userData.exp,
        })
      );

      return navigate("/");
    },
    onError: (error) => {
      console.error(error);

      setError("There is some problem. Let's try again soon.");
      return setIsErrorVisible(true);
    },
  });

  const { control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormValues> = async (formData) =>
    mutate(formData);

  return (
    <Container>
      <FormBox onSubmit={handleSubmit(onSubmit)} noValidate>
        <LoginHeading>Cookbook login</LoginHeading>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : " "}
              sx={{ marginBottom: "20px" }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : " "}
              sx={{ marginBottom: "50px" }}
            />
          )}
        />

        <LoadingButton
          variant="outlined"
          type="submit"
          color="inherit"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </FormBox>

      <Snackbar
        open={isErrorVisible}
        autoHideDuration={6000}
        onClose={() => setIsErrorVisible(false)}
      >
        <Alert severity="error" onClose={() => setIsErrorVisible(false)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
