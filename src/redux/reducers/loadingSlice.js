import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  initialState,
  name: 'loading',
  reducers: {
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    },
  },
});

export const {setIsLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
