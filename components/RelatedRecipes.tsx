import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BlogPostsProps } from "../lib/types";
import styled from "styled-components";
import { device } from "../styles/media";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 5rem;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: contain; // Optional
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
    while (listOfNums.length < 4) {
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
                src={`/${posts && posts[postIdx].slug}.jpg`}
                alt={`${posts && posts[postIdx].frontMatter.title}`}
                layout="fill"
                // priority={true}
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
