import styled from "@emotion/styled";

const Container = styled.div<{ margin: string }>`
  height: 2px;
  background-color: #bbb;
  margin: ${({ margin }) => margin};
`;

export { Container };
