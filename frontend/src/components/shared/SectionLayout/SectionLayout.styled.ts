import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const SectionLayout = styled.section<{
  height?: string;
  bgColor?: string;
  paddingDefault?: string;
  paddingMd?: string;
  paddingL?: string;
  paddingXl?: string;
  paddingXXl?: string;
  marginDefault?: string;
  marginMd?: string;
  marginL?: string;
  marginXl?: string;
  marginXXl?: string;
}>`
  width: 100%;
  height: ${({ height }) => (height ? height : "inherit")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  margin: ${({ marginDefault }) => (marginDefault ? marginDefault : "0")};
  padding: ${({ paddingDefault }) =>
    paddingDefault ? paddingDefault : "0 20px"};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding: ${({ paddingMd }) => (paddingMd ? paddingMd : "0 30px")};
    ${({ marginMd }) =>
      marginMd &&
      css`
        margin: ${marginMd};
      `}
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ paddingL }) => (paddingL ? paddingL : "0 50px")};
    ${({ marginL }) =>
      marginL &&
      css`
        margin: ${marginL};
      `}
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    padding: ${({ paddingXl }) => (paddingXl ? paddingXl : "0 100px")};
    ${({ marginXl }) =>
      marginXl &&
      css`
        margin: ${marginXl};
      `}
  }

  ${({ theme }) => theme.breakpoints.up("xl")} {
    padding: ${({ paddingXXl }) => (paddingXXl ? paddingXXl : "0 120px")};
    ${({ marginXXl }) =>
      marginXXl &&
      css`
        margin: ${marginXXl};
      `}
  }
`;
