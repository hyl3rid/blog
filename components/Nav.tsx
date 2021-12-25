import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { device } from "../styles/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Sidebar, Burger } from "./";

const Wrapper = styled.div`
  height: 6rem;
  border: none;
  background-color: var(--main);
  padding: 0 12.5rem;

  @media only screen and (${device.md}) {
    padding: 0 3rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;

  @media only screen and (${device.md}) {
    display: none;
  }
`;

const NavItem1 = styled.li`
  display: flex;
  flex: 1;
  justify-content: left;
`;

const NavItem2 = styled.li`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const NavItem3 = styled.li`
  display: flex;
  flex: 1;
  justify-content: right;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const Icon = styled.a`
  font-size: 2.3rem;
  height: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.3rem;
  color: #fff;
  cursor: pointer;
`;

const BurgerContainer = styled.div`
  height: 100%;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Nav() {
  const [burgerClicked, setBurgerClicked] = useState("");

  const handleBurgerClick = () => {
    if (burgerClicked.includes("active")) {
      setBurgerClicked("");
      return;
    }
    setBurgerClicked("active");
  };

  return (
    <Wrapper>
      <NavList>
        <NavItem1>
          <Link href="/recipes">
            <NavLink>Recipes</NavLink>
          </Link>
        </NavItem1>
        <NavItem2>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>
        </NavItem2>
        <NavItem3>
          <Link href="/search">
            <Icon>
              <FontAwesomeIcon icon={faSearch} />
            </Icon>
          </Link>
        </NavItem3>
      </NavList>
      <BurgerContainer onClick={handleBurgerClick}>
        <Burger />
      </BurgerContainer>
      <Sidebar active={burgerClicked} />
    </Wrapper>
  );
}

export default Nav;
