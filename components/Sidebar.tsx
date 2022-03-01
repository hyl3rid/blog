import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Styled = styled.div`
  top: 6rem;
  height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  position: fixed;
  left: -100%;
  background-color: var(--main);

  transition: left 0.3s ease-in-out;

  &.active {
    left: 0;
  }
`;

const NavList = styled.ul`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  height: 5rem;
  display: flex;
  align-items: center;
`;

interface Props {
  active: string;
}

const Sidebar = ({ active }: Props) => {
  return (
    <Styled className={active}>
      <NavList>
        <Link href="/">
          <NavLink>Home</NavLink>
        </Link>

        <Link href="/recipes">
          <NavLink>Recipes</NavLink>
        </Link>

        <Link href="/search">
          <NavLink>Search</NavLink>
        </Link>
      </NavList>
    </Styled>
  );
};

export default Sidebar;
