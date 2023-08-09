import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  jwtToken:"",
  isLoggedIn:false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    userLoggedIn: (state) => {
      debugger
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
    },
    
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.jwtToken=null;
    },

    setJwtToken:(state, action)=>{
      console.log(" state.jwtToken from reducer "+action.payload);
      state.jwtToken=action.payload;
    }
  },
 
});

export const {userLoggedIn,userLoggedOut,setJwtToken } = counterSlice.actions;
export default counterSlice.reducer;
