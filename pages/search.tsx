import React, { useState } from "react";
import { Layout } from "../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin-top: 5rem;
  margin-left: 12.5rem;
  margin-right: 12.5rem;
`;

const Icon = styled.a`
  font-size: 2.3rem;
  color: #000;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding-right: 60px;
  height: 5.5rem;
  width: 100%;
`;

const SearchBar = styled.form`
  position: relative;
  height: 100px;
  width: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  top: 10px;
  background-color: transparent;
  border: none;
  padding-right: 6rem;
`;

const Search = ({ posts }: any) => {
  const [query, setQuery] = useState("");

  const searchMarkdownFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const result = await searchAllMarkdownContent("blog", query);
    // console.log(result);
  };

  const searchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Layout>
      <Wrapper>
        <h3>Search</h3>
        <SearchBar onSubmit={searchMarkdownFiles}>
          <StyledInput
            placeholder="Search for articles..."
            onChange={searchQuery}
          ></StyledInput>
          <StyledButton type="submit">
            <Icon>
              <FontAwesomeIcon icon={faSearch} />
            </Icon>
          </StyledButton>
        </SearchBar>
        <h4>Results</h4>
      </Wrapper>
    </Layout>
  );
};

export default Search;
