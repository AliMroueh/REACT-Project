import { createSlice } from '@reduxjs/toolkit';


export const signSlice = createSlice({
    name: 'sign',
    initialState:{
      sign: null
    },
    reducers: {
      changesignup: (state,action) =>{
        state.sign = action.payload;
      },
    },
  });

  export const { changesignup} = signSlice.actions;

  export const selectSign = (state) => state.sign;

  export default signSlice.reducer;