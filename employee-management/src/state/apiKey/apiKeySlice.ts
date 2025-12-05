import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ApiKeyState = {
  value: string | null;
};

const initialState: ApiKeyState = {
  value: null,
};

const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    setApiKey(state, action: PayloadAction<string | null>) {
      state.value = action.payload ?? null;
    },
    clearApiKey(state) {
      state.value = null;
    },
  },
});

export const { setApiKey, clearApiKey } = apiKeySlice.actions;
export default apiKeySlice.reducer;
