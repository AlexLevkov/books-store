import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search by title or author..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <Button
        className="mx-3 d-flex align-items-center justify-content-center"
        variant="primary"
        onClick={handleSearch}
      >
        <FaSearch className="me-2" />
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
