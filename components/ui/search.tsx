import React from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';

// Define the types for the props
interface SearchProps {
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Assuming useDebouncedCallback is correctly typed from its respective library
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(router.query as Record<string, string>);

    params.set("page", "1");

    if (value) {
      value.length > 2 && params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace({ pathname, query: params.toString() });
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(handleSearch as unknown) as React.ChangeEventHandler<HTMLInputElement>}
      />
    </div>
  );
};

export default Search;
