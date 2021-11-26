import Link from "next/link";
import Image from "next/image";
import { BlogPostsProps } from "../lib/types";
import styled from "styled-components";

const PublishDate = styled.p`
  color: #7f7f7f;
  font-size: 1.5rem;
`;

const ImageWrapper = styled.div`
  width: 35rem;
  height: 25rem;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
`;

const FeaturedPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 12.5rem;
  justify-content: center;
  width: 100%;
`;

const Posts = styled.div`
  article {
    margin-bottom: 2.5rem;
  }

  article:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
`;

const CardWrapper = styled.article`
  width: 35rem;
  margin: auto;
`;

const BlogPosts = ({ posts }: BlogPostsProps) => {
  return (
    <Posts>
      {!posts && <div>No posts!</div>}
      <FeaturedPosts>
        {posts &&
          posts
            .sort(
              (a, b) =>
                new Date(b.frontMatter.publishedDate).getTime() -
                new Date(a.frontMatter.publishedDate).getTime()
            )
            .map((post) => {
              return (
                <CardWrapper key={post.slug}>
                  <Link href={{ pathname: `/${post.slug}` }}>
                    <a>
                      <ImageWrapper>
                        <Image
                          className="image"
                          src={`/${post.slug}.jpg`}
                          layout="fill"
                          // priority={true}
                        />
                      </ImageWrapper>
                    </a>
                  </Link>{" "}
                  <div>
                    <h3>{post.frontMatter.title}</h3>
                    {/* Fix date format */}
                    <PublishDate>{post.frontMatter.publishedDate}</PublishDate>
                    <Description>{post.frontMatter.description}</Description>
                    {/* <p>[ {post.frontMatter.tags.join(", ")} ]</p> */}
                  </div>
                </CardWrapper>
              );
            })}
      </FeaturedPosts>
    </Posts>
  );
};

export default BlogPosts;
