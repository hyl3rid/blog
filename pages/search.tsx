import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin-top: 5rem;
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 26rem);
`;

const Icon = styled.a`
  height: 2.3rem;
  width: 2.3rem;
  font-size: 2.3rem;
  color: #000;
`;

const StyledInput = styled.input`
  padding-right: 60px;
  height: 5.5rem;
  width: 100%;
`;

const SearchBar = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
`;

const StyledIcon = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  background-color: transparent;
  border: none;
  padding-right: 6rem;
`;

const StyledTitleResult = styled.h4`
  margin-bottom: 1rem;
`;

const StyledDescription = styled.p`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const ImageWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const StyledResults = styled.div`
  width: 100%;
`;

const Search = ({ posts }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
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
          ></StyledInput>
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
            {results.map(
              (result: { id: string; title: string; description: string }) => {
                return (
                  <Link href={`/${result.id}`} key={result.id}>
                    <ResultWrapper>
                      <ImageWrapper>
                        <Image
                          className="image"
                          src={`/${result.id}.jpg`}
                          alt={result.title}
                          layout="fill"
                          // priority={true}
                          width={100}
                          height={100}
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
