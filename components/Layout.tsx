import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { createGlobalStyle } from "styled-components";

// Workaround to problem with icons being huge huge first load prior to resizing
// This ensures that the icon CSS is loaded immediately before attempting to render icons
// See https://github.com/FortAwesome/react-fontawesome/issues/134
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
fontAwesomeConfig.autoAddCss = false;

export const GlobalStyle = createGlobalStyle`

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  --main: #184454;
  --secondary: #DDAA00;
  --main-dark: #02000e;
  font-size: 62.5%;
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Set core body defaults */
body {
  color: var(---main);
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-size: 1.7rem;
}

h1 {
  font-size: 3.5rem;
  text-align: center;
  margin-top: 0;
}

h2 {
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0;
}

h3 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 0;
}

h4 {
  font-size: 2rem;
  font-weight: 500;
  margin-top: 0;
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
