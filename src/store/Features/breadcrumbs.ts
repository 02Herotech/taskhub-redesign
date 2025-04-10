import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LINK = { url: string; text: string };

const initialState: { header: string; links: LINK[] } = {
  header: "",
  links: [],
};

const crumbSlice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    setBreadCrumbs: (
      state,
      action: PayloadAction<{ header: string; links: LINK[] }>,
    ) => {
      return action.payload;
    },
  },
});

export const { setBreadCrumbs } = crumbSlice.actions;
export default crumbSlice.reducer;
