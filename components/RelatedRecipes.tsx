import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPostsProps } from "../lib/types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`;

const ImageWrapper = styled.div`
  width: 30rem;
  height: 20rem;
  position: relative;
  display: flex;

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
  }
`;

const Label = styled.div`
  position: absolute;
  height: 3rem;
  width: 100%;
  background-color: rgb(2, 0, 14, 0.5);
  bottom: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    z-index: 10;
    color: #fff;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const RelatedRecipes = ({ posts, currentPostFrontMatter }: BlogPostsProps) => {
  const [listOfRandoms, setListOfRandoms] = useState<number[]>([]);

  const getRandomInt = (max: number) => {
    let listOfNums: number[] = [];
    while (listOfNums.length < 3) {
      const randomNum = Math.floor(Math.random() * max);
      const notCurrentPost =
        currentPostFrontMatter?.title !==
        (posts && posts[randomNum].frontMatter.title);
      if (!listOfNums.includes(randomNum) && notCurrentPost) {
        listOfNums.push(randomNum);
      }
    }
    return listOfNums;
  };

  useEffect(() => {
    const postsNum = posts && posts.length;
    setListOfRandoms(getRandomInt(postsNum ?? 0));
  }, []);

  return (
    <Wrapper>
      {listOfRandoms.map((postIdx) => {
        return (
          <StyledLink href={`/${posts && posts[postIdx].slug}`} key={postIdx}>
            <ImageWrapper>
              <Image
                className="image"
                src={`/../public/${posts && posts[postIdx].slug}.jpg`}
                layout="fill"
                priority={true}
              />
              <Label>
                <span className="text">{`${
                  posts && posts[postIdx].frontMatter.title
                }`}</span>
              </Label>
            </ImageWrapper>
          </StyledLink>
        );
      })}
    </Wrapper>
  );
};

export default RelatedRecipes;
