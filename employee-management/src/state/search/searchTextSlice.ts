import { createSlice } from "@reduxjs/toolkit";

interface SearchTextState {
  text: string;
}
const initialState: SearchTextState = {
  text: "",
};

const searchTextSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    setSearchText(state, action: { payload: string }) {
      state.text = action.payload;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;
