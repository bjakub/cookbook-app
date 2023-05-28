import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormBox, LoginHeading } from "./Login.styled";
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

interface IFormValues {
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

const postLogin = async (formData: IFormValues) => {
  return fetch(process.env.REACT_APP_API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation(postLogin, {
    onSuccess: async (fetchData) => {
      if (!fetchData.ok) return;

      const userData = await fetchData.json();

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
      console.log("error");
      console.log(error);
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
    mutation.mutate(formData);

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

        <Button variant="outlined" type="submit" color="success">
          Login
        </Button>
      </FormBox>
    </Container>
  );
};
