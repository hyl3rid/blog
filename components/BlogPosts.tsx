import Link from "next/link";
import Image from "next/image";
import { BlogPostsProps } from "../lib/types";
import styled from "styled-components";
import { device } from "../styles/media";

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

  @media only screen and (${device.md}) {
    width: 25rem;
  }

  @media only screen and (${device.sm}) {
    width: 100%;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
`;

const FeaturedPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 0 12.5rem;
  justify-content: center;

  @media only screen and (${device.lg}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 3rem;
  }

  @media only screen and (${device.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Anchor = styled.a`
  color: var(--main-dark);
  text-decoration: none;
  cursor: pointer;
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
  height: 100%;
  margin: auto;

  @media only screen and (${device.md}) {
    width: 25rem;
  }

  @media only screen and (${device.sm}) {
    width: 35rem;
  }

  @media only screen and (${device.xs}) {
    width: calc(100vw - 2rem);
  }
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
                  </Link>
                  <div>
                    <Link href={{ pathname: `/${post.slug}` }}>
                      <Anchor>
                        <h3>{post.frontMatter.title}</h3>
                      </Anchor>
                    </Link>
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
