import React from "react";
import { Container } from "./Spacer.styled";

export const Spacer = ({ verticalSpace }: OwnProps) => {
  return <Container margin={verticalSpace} />;
};

interface OwnProps {
  verticalSpace: string;
}
