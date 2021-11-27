import { BlogPosts, Layout, HomePage } from "../components";
import type { ReactElement } from "react";
import { getAllPostsWithFrontMatter } from "../lib/utils";
import { BlogProps } from "../lib/types";
import Head from "next/head";

export default function Page({ posts }: BlogProps) {
  const firstSix = posts?.slice(0, 6);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <HomePage />
      <h2>Latests Recipes</h2>
      <BlogPosts posts={firstSix} />
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("blog");

  return {
    props: {
      posts,
    },
  };
}
