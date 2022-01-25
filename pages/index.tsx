import { BlogPosts, Layout, HomePage } from "../components";
import type { ReactElement } from "react";
import { getAllPostsWithFrontMatter } from "../lib/utils";
import { BlogProps } from "../lib/types";

export default function Page({ filteredPosts }: BlogProps) {
  const firstSix = filteredPosts
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
  const posts: any = await getAllPostsWithFrontMatter("blog");
  const filteredPosts = posts.filter(
    (item: any) => !item.slug.includes("vegan") && item
  );
  return {
    props: {
      filteredPosts,
    },
  };
}
