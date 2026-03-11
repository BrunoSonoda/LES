import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: left;

  a {
    color: #fff;
    margin: 0 20px 0 0;
    font-weight: bold;
  }
`;
