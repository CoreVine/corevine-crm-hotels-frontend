import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

const exampleSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourties: (state, { payload }: { payload: number }) => {},
    removeFromFavourites: (state, { payload }: { payload: number }) => {}
  }
});

export default exampleSlice.reducer;
export const { addToFavourties, removeFromFavourites } = exampleSlice.actions;
