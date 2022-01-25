import { Params } from "../node_modules/next/dist/server/router";

export type BlogFrontMatter = {
  title: string;
  description: string;
  publishedDate: string;
  tags: string[];
};

export type BlogLayoutProps = {
  children: React.ReactNode;
  frontMatter: BlogFrontMatter;
  wordCount: number;
  readingTime: string;
};

export type BlogPostProps = {
  slug: string;
  siteTitle: string;
  frontMatter: BlogFrontMatter;
  markdownBody: any;
  wordCount: number;
  readingTime: string;
  posts: BlogPostProps[] | undefined;
  params: Params;
  listOfNums?: number[];
};

export type BlogPostsProps = {
  posts?: BlogPostProps[];
  currentPostSlug?: Params;
  listOfNums?: number[];
};

export interface BlogProps extends BlogPostsProps {
  title: string;
  description: string;
  filteredPosts?: BlogPostProps[];
}

export type FeaturedRecipes = {
  [idx: number]: {
    img: StaticImageData;
    url: string;
    title: string;
  };
};
