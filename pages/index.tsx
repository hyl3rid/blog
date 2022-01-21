import { BlogPosts, Layout, HomePage } from "../components";
import type { ReactElement } from "react";
import { getAllPostsWithFrontMatter } from "../lib/utils";
import { BlogProps } from "../lib/types";

export default function Page({ posts }: BlogProps) {
  const firstSix = posts
    ?.sort(
      (a, b) =>
        new Date(b.frontMatter.publishedDate).getTime() -
        new Date(a.frontMatter.publishedDate).getTime()
    )
    .slice(0, 6);
  return (
    <>
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
