import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tags: null,
  imageSubTags: null,
};

const tagSlice = createSlice({
  initialState,
  name: 'tag',
  reducers: {
    setTags(state, {payload}) {
      state.tags = payload;
    },
    setImageSubTags(state, {payload}) {
      state.imageSubTags = payload;
    },
  },
});

export const {setTags, setImageSubTags} = tagSlice.actions;
export default tagSlice.reducer;
