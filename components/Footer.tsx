import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  height: 10rem;
  background-color: var(--main);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  font-size: 2rem;
`;

function Footer() {
  return <Wrapper>VeggiesForAll &copy; {new Date().getFullYear()}</Wrapper>;
}

export default Footer;
