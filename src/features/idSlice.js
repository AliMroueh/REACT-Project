import { createSlice } from '@reduxjs/toolkit';


export const idSlice = createSlice({
  name: 'id',
  initialState:{
      idId: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setid : (state,action) =>{
      state.idId = action.payload.idId;
    }
  },
});



export const { setid } = idSlice.actions;

export const selectidId = (state) => state.id.idId;

export default idSlice.reducer;
