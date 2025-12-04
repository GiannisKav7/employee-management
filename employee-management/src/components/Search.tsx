import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../state/search/searchTextSlice";
import styles from "./Search.module.scss";

export function Search() {
  // use typed selector if you have RootState: useSelector((s: RootState) => s.searchText.text)
  const searchText = useSelector((state: any) => state.searchText.text);
  const dispatch = useDispatch(); // const dispatch = useDispatch<AppDispatch>();

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
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          type="search"
          placeholder="Search employee here..."
          aria-label="Search employees"
          size="small"
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
