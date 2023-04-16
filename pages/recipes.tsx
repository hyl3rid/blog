import React from "react";
import { getAllPostsWithFrontMatter } from "../lib/utils";
import { BlogPostsProps } from "../lib/types";
import { Layout, BlogPosts } from "../components";
import styled from "styled-components";

const H2 = styled.h2`
  margin-top: 5rem;
`;

const Recipes = ({ posts }: BlogPostsProps) => {
  return (
    <Layout>
      <H2>Recipes</H2>
      <BlogPosts posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("blog");

  return {
    props: {
      posts,
    },
  };
}

export default Recipes;
