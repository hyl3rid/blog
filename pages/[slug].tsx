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
`;

const Anchor = styled.a`
  background-color: var(--main);
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem;
  text-decoration: none;
  /* cursor: pointer; */
`;

const BlogPost = ({
  frontMatter,
  markdownBody,
  posts,
  params,
}: BlogPostProps) => {
  if (!frontMatter) return <></>;
  return (
    <Layout2 title={frontMatter.title} description={frontMatter.description}>
      <Wrapper>
        <TabWrapper>
          {frontMatter.tags.includes("vegetarian") && (
            // <Anchor href={`/${params.slug}`}>Vegetarian</Anchor>
            <Anchor>Vegetarian</Anchor>
          )}

          {frontMatter.tags.includes("vegan") && (
            // <Anchor href={`/${params.slug}`}>Vegan</Anchor>
            <Anchor>Vegan</Anchor>
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
        <RelatedRecipes posts={posts} currentPostFrontMatter={frontMatter} />
      </Wrapper>
    </Layout2>
  );
};

export async function getStaticProps({ params }: Params) {
  const { frontMatter, markdownBody } = await getPostBySlug(
    "blog",
    params.slug
  );
  const posts = await getAllPostsWithFrontMatter("blog");

  return {
    props: {
      frontMatter,
      markdownBody,
      posts,
      params,
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
