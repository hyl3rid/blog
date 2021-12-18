import React, { useState } from "react";

import Link from "next/link";
import styled from "styled-components";
import { device } from "../styles/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  height: 6rem;
  border: none;
  padding: 0 12.5rem;
  background-color: var(--main);

  @media only screen and (${device.md}) {
    padding: 0 6rem;
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
  width: 2.3rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Burger = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  .ham {
    height: 6rem;
    width: 6rem;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .hamRotate.active {
    transform: rotate(45deg);
  }

  .line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #fff;
    stroke-width: 5.5;
    stroke-linecap: round;
  }

  .ham8 .top {
    stroke-dasharray: 40 160;
  }
  .ham8 .middle {
    stroke-dasharray: 40 142;
    transform-origin: 50%;
    transition: transform 400ms;
  }
  .ham8 .bottom {
    stroke-dasharray: 40 85;
    transform-origin: 50%;
    transition: transform 400ms, stroke-dashoffset 400ms;
  }
  .ham8.active .top {
    stroke-dashoffset: -64px;
  }
  .ham8.active .middle {
    //stroke-dashoffset: -20px;
    transform: rotate(90deg);
  }
  .ham8.active .bottom {
    stroke-dashoffset: -64px;
  }
`;

function Nav() {
  const [style, setStyle] = useState("ham hamRotate ham8");

  const handleToggleStyle = () => {
    if (style.includes("active")) {
      setStyle("ham hamRotate ham8");
      return;
    }
    setStyle("ham hamRotate ham8 active");
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
      <Burger>
        <svg
          className={style}
          viewBox="0 0 100 100"
          width="80"
          onClick={handleToggleStyle}
        >
          <path
            className="line top"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          />
          <path className="line middle" d="m 30,50 h 40" />
          <path
            className="line bottom"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          />
        </svg>
      </Burger>
    </Wrapper>
  );
}

export default Nav;
