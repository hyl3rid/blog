import React from "react";
import Image from "next/image";
import Link from "next/link";
import Lasagna from "../public/lasagna.jpg";
import styled from "styled-components";
import { device } from "../styles/media";
import EmblaCarousel from "./EmblaCarousel";

const Hero = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 60rem;
  margin-bottom: 5rem;
  width: 100%;

  @media only screen and (${device.lg}) {
    height: 40rem;
  }

  @media only screen and (${device.md}) {
    grid-template-columns: repeat(1, 1fr);
    grid-row: 2;
    height: 100%;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingWrapper = styled.div`
  text-align: center;

  @media only screen and (${device.md}) {
    margin: 0 12.5rem;
  }
  @media only screen and (${device.sm}) {
    margin: 0 5rem;
  }
  @media only screen and (${device.xs}) {
    margin: 0 2rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .image {
    object-fit: cover; // Optional
  }

  @media only screen and (${device.md}) {
    grid-row: 1;
    height: 35rem;
  }
  @media only screen and (${device.sm}) {
    grid-row: 1;
    height: 30rem;
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3.5rem;
`;

const H4 = styled.h4`
  /* font-weight: 400; */
  font-size: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  background-color: var(--secondary);
  color: #fff;
  height: 6rem;
  width: 15rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const HomePage = () => {
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      <Hero>
        <Heading>
          <HeadingWrapper>
            <H1>Deliciously Cheesy Vegan Lasagna</H1>
            <H4>
              Enjoy this delicious lasagna with vegetables. Packed with cheese,
              zucchini, tomatoes, bechamel sauce and more. Great for any special
              occasion!
            </H4>
            <ButtonWrapper>
              <Link href="/lasagna">
                <Button>Read More</Button>
              </Link>
            </ButtonWrapper>
          </HeadingWrapper>
        </Heading>
        <ImageWrapper>
          <Link href="/lasagna">
            <a>
              <Image
                className="image"
                src={Lasagna}
                alt="Lasagna Meal"
                layout="fill"
                priority={true}
              />
            </a>
          </Link>
        </ImageWrapper>
      </Hero>
      <EmblaCarousel slides={slides} />
    </>
  );
};

export default HomePage;
