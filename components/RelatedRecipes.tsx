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
  width: 50vw;
  height: 50vh;
  position: relative;
  display: flex;

  .image {
    width: 100% !important;
    /* height: 50rem; */
    position: relative !important;
    object-fit: cover !important; // Optional
    height: unset !important;
  }

  @media only screen and (${device.md}) {
    height: 40vh;
  }

  @media only screen and (${device.sm}) {
    height: 30vh;
  }

  @media only screen and (${device.xs}) {
    height: 25vh;
  }
`;

const Label = styled.div`
  position: absolute;
  height: unset;
  width: 100%;
  background-color: rgb(2, 0, 14, 0.5);
  bottom: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    z-index: 10;
    color: #fff;
    margin: 0;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

// Image optimization
export type ImageLoaderProps = {
  src: string;
  width?: number;
  quality?: number;
};

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://blog-omega-ochre.vercel.app/${src}?w=${700}&q=${quality || 75}`;
};

const RelatedRecipes = ({ posts, currentPostSlug }: BlogPostsProps) => {
  const [listOfRandoms, setListOfRandoms] = useState<number[]>([]);

  const getRandomInt = (max: number) => {
    let listOfNums: number[] = [];
    let added: string = "";
    while (listOfNums.length < 4) {
      const randomNum = Math.floor(Math.random() * max);

      let tempPostsSlug = posts && posts[randomNum].slug;

      const postSlug =
        tempPostsSlug && tempPostsSlug.includes("vegan")
          ? tempPostsSlug.replace("vegan", "")
          : tempPostsSlug;

      const notCurrentPost = currentPostSlug?.includes("vegan")
        ? currentPostSlug?.replace("vegan", "")
        : currentPostSlug !== postSlug;

      if (
        postSlug &&
        !listOfNums.includes(randomNum) &&
        notCurrentPost &&
        !added.includes(postSlug)
      ) {
        listOfNums.push(randomNum);
        added += postSlug;
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
                loader={myLoader}
                quality={30}
                className="image"
                src={`/${
                  posts && posts[postIdx].slug.includes("vegan")
                    ? posts[postIdx].slug.replace("vegan", "")
                    : posts && posts[postIdx].slug
                }.jpg`}
                alt={`${posts && posts[postIdx].frontMatter.title}`}
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
