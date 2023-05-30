import React from "react";
import { Container, Form, ButtonsBox } from "./Register.styled";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserSchema } from "../../schemas/register-user.schema";
import { useMutation } from "react-query";
import { registerUserAPI } from "../../api/registerUser.api";
import { useError } from "../../hooks/useError";
import { SnackbarAlert } from "../../components/SnackbarAlert/SnackbarAlert";
import { useNavigate } from "react-router-dom";

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const [error, isErrorVisible, handleError, setIsErrorVisible] = useError<
    string | string[]
  >();

  const { control, reset, handleSubmit } = useForm<IRegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
    },
    resolver: yupResolver(registerUserSchema),
  });

  const { mutate, isLoading } = useMutation(
    (formData: IRegisterFormValues) => registerUserAPI(formData, "USER"),
    {
      onMutate: () => {
        setIsErrorVisible(false);
      },
      onSuccess: async (data) => {
        const userData = await data.json();
        if (!data.ok) {
          if (userData.error && userData.message) {
            return handleError(userData.message);
          }

          return handleError(
            "There is some problem with sign up the user. Try again later."
          );
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

        return handleError(
          "There is some problem with sign up the user. Try again later."
        );
      },
    }
  );

  const onSubmit: SubmitHandler<IRegisterFormValues> = (formData) => {
    mutate(formData);
  };

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "50px" }}
      >
        Register user
      </Typography>

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : ""}
              required
              label="Email"
              type="email"
              margin="dense"
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : ""}
              required
              label="Password"
              type="password"
              margin="dense"
              fullWidth
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : ""}
              required
              label="Confirm password"
              type="password"
              margin="dense"
              fullWidth
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : ""}
              required
              label="Name"
              margin="dense"
              fullWidth
            />
          )}
        />

        <Controller
          name="surname"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={!!fieldState.error ? fieldState.error.message : ""}
              label="Surname"
              margin="dense"
              fullWidth
            />
          )}
        />
        <ButtonsBox>
          <Button
            type="button"
            variant="outlined"
            color="error"
            sx={{ width: "45%" }}
            onClick={() => reset()}
          >
            Reset form
          </Button>

          <LoadingButton
            type="submit"
            variant="outlined"
            color="success"
            loading={isLoading}
            sx={{ width: "45%" }}
          >
            Sign up
          </LoadingButton>
        </ButtonsBox>
      </Form>

      <SnackbarAlert
        isSnackbarVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
        errorMessage={error}
      />
    </Container>
  );
};
