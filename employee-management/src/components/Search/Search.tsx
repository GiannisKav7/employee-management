import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, IconButton, debounce } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../state/search/searchTextSlice";
import { useCallback, useState } from "react";

import styles from "./Search.module.scss";

export function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedDispatch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchText(value));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedDispatch(value); // call debounced function
  };

  return (
    <Box component="section" id="search" className={styles.section}>
      <Box
        component="form"
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          name="employeeSearch"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={searchTerm}
          onChange={handleSearchChange}
          type="search"
          placeholder="Search employee here..."
          aria-label="Search employees"
          size="medium"
          fullWidth
          variant="outlined"
          className={styles.input}
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                aria-label="Search"
                edge="end"
                className={styles.submitBtn}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
