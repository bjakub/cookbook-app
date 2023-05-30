import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormBox } from "./Login.styled";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import { loginUserAPI } from "../../api/loginUser.api";
import { DinnerDining } from "@mui/icons-material";
import { Spacer } from "../../components/Spacer/Spacer";
import { loginUserSchema } from "../../schemas/login-user.schema";
import { useError } from "../../hooks/useError";
import { SnackbarAlert } from "../../components/SnackbarAlert/SnackbarAlert";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [error, isErrorVisible, handleError, setIsErrorVisible] =
    useError<string>();

  const { mutate, isLoading } = useMutation(loginUserAPI, {
    onMutate: () => {
      setIsErrorVisible(false);
    },
    onSuccess: async (fetchData) => {
      const userData = await fetchData.json();

      if (!fetchData.ok) {
        if (userData.message) {
          return handleError(userData.message);
        }

        return handleError("There is some problem. Let's try again soon.");
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

      return handleError("There is some problem. Let's try again soon.");
    },
  });

  const { control, handleSubmit } = useForm<ILoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = async (formData) =>
    mutate(formData);

  return (
    <Container>
      <FormBox onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Cook
          <DinnerDining sx={{ margin: "0 10px" }} fontSize="large" />
          Book
        </Typography>

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
          color="success"
          loading={isLoading}
        >
          Login
        </LoadingButton>
        <Spacer verticalSpace="30px 0" />
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate("/signUp")}
        >
          Sign up
        </Button>
      </FormBox>

      <SnackbarAlert
        isSnackbarVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
        errorMessage={error}
      />
    </Container>
  );
};
