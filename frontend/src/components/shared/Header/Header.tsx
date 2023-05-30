import React from "react";
import { Container, LogoBox } from "./Header.styled";
import { Typography } from "@mui/material";
import { DinnerDining } from "@mui/icons-material";
import { Profile } from "./Profile/Profile";

export const Header = () => {
  return (
    <Container
      as="header"
      paddingDefault="15px 20px"
      paddingMd="15px 30px"
      paddingL="15px 50px"
      paddingXl="15px 80px"
      paddingXXl="15px 100px"
    >
      <LogoBox>
        <Typography variant="h5">Cook</Typography>
        <DinnerDining sx={{ margin: "0 10px" }} fontSize="large" />
        <Typography variant="h5">Book</Typography>
      </LogoBox>
      <Profile />
    </Container>
  );
};
