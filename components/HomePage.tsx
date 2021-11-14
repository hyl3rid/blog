import React from "react";
import Image from "next/image";
import Lasagna from "../public/lasagna.jpg";
import styled from "styled-components";
import EmblaCarousel from "./EmblaCarousel";

const Hero = styled.div`
  display: flex;
  height: 60rem;
  margin-bottom: 5rem;
`;

const Heading = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingWrapper = styled.div`
  width: 40rem;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3.5rem;
`;

const H4 = styled.h1`
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
`;

const HomePage = () => {
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      <Hero>
        <Heading>
          <HeadingWrapper>
            <H1>Cras a nibh vel ligula.</H1>
            <H4>
              Morbi molestie lectus tellus, id condimentum libero porttitor
              dapibus. Vivamus aliquam commodo odio, ut fringilla.
            </H4>
            <ButtonWrapper>
              <Button>Read More</Button>
            </ButtonWrapper>
          </HeadingWrapper>
        </Heading>
        <ImageWrapper>
          <Image
            className="image"
            src={Lasagna}
            alt="Lasagna Meal"
            layout="fill"
            priority={true}
          />
        </ImageWrapper>
      </Hero>
      <EmblaCarousel slides={slides} />
    </>
  );
};

export default HomePage;
