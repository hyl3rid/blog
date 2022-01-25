import ReactMarkdown from "react-markdown";
import RelatedRecipes from "../components/RelatedRecipes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { Layout } from "../components/Layout";
import { BlogPostProps } from "../lib/types";
import {
  getFiles,
  getPostBySlug,
  getAllPostsWithFrontMatter,
} from "../lib/utils";
// import Link from "next/link";
import React from "react";
import { Layout2 } from "../components";
import { Params } from "../node_modules/next/dist/server/router";
// import { LinkProps } from "../node_modules/next/dist/client/link";
import styled from "styled-components";
import { device } from "../styles/media";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5rem;

  img[title="image"] {
    width: 100%;
  }
`;

const MarkdownWrapper = styled.div`
  width: 70%;

  @media only screen and (${device.md}) {
    width: 100%;
    padding: 0 3rem;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  width: 70%;

  @media only screen and (${device.md}) {
    width: 100%;
    padding: 0 3rem;
  }
`;

const Anchor = styled.a`
  background-color: var(--main);
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem;
  text-decoration: none;
  cursor: pointer;
`;

const Label = styled.a`
  background-color: var(--main);
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem;
`;

const BlogPost = ({
  frontMatter,
  markdownBody,
  posts,
  params,
  listOfNums,
}: BlogPostProps) => {
  if (!frontMatter) return <></>;
  if (params.slug.includes("vegan"))
    params.slug = params.slug.replace("vegan", "");
  return (
    <Layout2 title={frontMatter.title} description={frontMatter.description}>
      <Wrapper>
        <TabWrapper>
          {frontMatter.tags.includes("vegetarian") &&
          frontMatter.tags.includes("vegan") ? (
            <>
              <Anchor href={`/${params.slug}`}>Vegetarian</Anchor>
              <Anchor href={`/vegan${params.slug}`}>Vegan</Anchor>
            </>
          ) : frontMatter.tags.includes("vegetarian") ? (
            <Label>Vegetarian</Label>
          ) : frontMatter.tags.includes("vegan") ? (
            <Label>Vegan</Label>
          ) : (
            false
          )}
        </TabWrapper>
        <MarkdownWrapper>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={vscDarkPlus}
                    // customStyle={{ width: "80%;" }}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownBody}
          </ReactMarkdown>
        </MarkdownWrapper>
        <RelatedRecipes posts={posts} listOfNums={listOfNums} />
      </Wrapper>
    </Layout2>
  );
};

export async function getStaticProps({ params }: Params) {
  const { frontMatter, markdownBody } = await getPostBySlug(
    "blog",
    params.slug
  );
  const posts: any = await getAllPostsWithFrontMatter("blog");

  let listOfNums: number[] = [];
  let added: string = "";
  while (listOfNums.length < 4) {
    const randomNum = Math.floor(Math.random() * posts.length);
    console.log(posts[randomNum].slug);
    let tempPostsSlug = posts && posts[randomNum].slug;

    const postSlug =
      tempPostsSlug && tempPostsSlug.includes("vegan")
        ? tempPostsSlug.replace("vegan", "")
        : tempPostsSlug;

    const notCurrentPost = params.slug?.includes("vegan")
      ? params.slug?.replace("vegan", "")
      : params.slug !== postSlug;

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

  return {
    props: {
      frontMatter,
      markdownBody,
      posts,
      params,
      listOfNums,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getFiles("blog");

  const paths = posts.map((filename: string) => ({
    params: {
      slug: filename.replace(/\.md/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BlogPost;
