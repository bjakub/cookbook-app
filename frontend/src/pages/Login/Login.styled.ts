import styled from "@emotion/styled";

const Container = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  width: 300px;
  max-width: 300px;
  border: 5px solid #333;
  box-shadow: 5px 10px black;
`;

const LoginHeading = styled.h2`
  text-align: center;
  margin: 0 0 50px 0;
`;

export { Container, FormBox, LoginHeading };
