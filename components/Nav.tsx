import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  height: 6rem;
  border: none;
  padding: 0 12.5rem;
  background-color: var(--main);
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
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
  color: #fff;
  cursor: pointer;
`;

function Nav() {
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
    </Wrapper>
  );
}

export default Nav;
