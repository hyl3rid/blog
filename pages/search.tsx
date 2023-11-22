import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components";
import styled from "styled-components";
import { device } from "../styles/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin-top: 6rem;
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 27rem);

  @media only screen and (${device.md}) {
    margin-left: 3rem;
    margin-right: 3rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
`;

const Icon = styled.div`
  height: 2.3rem;
  width: 2.3rem;
  /* font-size: 2.3rem; */
  color: #000;
  height: 100%;
`;

const StyledIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  right: 0;
  top: 16px;
  background-color: transparent;
  border: none;
  padding-right: 6rem;

  @media only screen and (${device.md}) {
    padding-right: 3rem;
  }
`;

const StyledInput = styled.input`
  height: 5.5rem;
  width: 100%;
`;

const StyledTitleResult = styled.h4`
  margin-bottom: 1rem;
`;

const StyledDescription = styled.p`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const ImageWrapper = styled.div`
  min-width: 7rem;
  max-width: 7rem;
  height: 7rem;
  margin-right: 1rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  @media only screen and (${device.xs}) {
    border-radius: 0;
    height: 12rem;
    max-width: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
    object-position: center center;
  }
`;

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  cursor: pointer;

  @media only screen and (${device.xs}) {
    grid-template-columns: 1fr;
  }
`;

const StyledResults = styled.div`
  width: 100%;
`;

// Image optimization
export type ImageLoaderProps = {
  src: string;
  width?: number;
  quality?: number;
};

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://blog-omega-ochre.vercel.app//${src}?w=${700}&q=${quality || 75}`;
};

const Search = ({ posts }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      fetch(searchEndpoint(query.toLowerCase()))
        .then((response) => response.json())
        .then((data) => setResults(data.results));
    } else {
      setResults([]);
    }
  }, [query]);

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevState) => {
      return (prevState = e.target.value);
    });
  };

  return (
    <Layout>
      <Wrapper>
        <h3>Search</h3>
        <SearchBar>
          <StyledInput
            placeholder="Search for articles..."
            onChange={onChange}
            value={query}
            type="text"
          />
          <StyledIcon>
            <Icon>
              <FontAwesomeIcon icon={faSearch} />
            </Icon>
          </StyledIcon>
        </SearchBar>
        {results.length === 0 ? (
          <></>
        ) : (
          <div>
            <h4>Results</h4>
            {results
              .filter((result: { id: string }) => {
                return !result.id.includes("vegan");
              })
              .map(
                (result: {
                  id: string;
                  title: string;
                  description: string;
                }) => {
                  return (
                    <Link href={`/${result.id}`} key={result.id}>
                      <ResultWrapper>
                        <ImageWrapper>
                          <Image
                            loader={myLoader}
                            quality={30}
                            className="image"
                            src={`/${result.id}.jpg`}
                            alt={result.title}
                            layout="fill"
                            priority={true}
                          />
                        </ImageWrapper>
                        <StyledResults>
                          <StyledTitleResult>{result.title}</StyledTitleResult>
                          <StyledDescription>
                            {result.description}
                          </StyledDescription>
                          <hr />
                        </StyledResults>
                      </ResultWrapper>
                    </Link>
                  );
                }
              )}
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default Search;
