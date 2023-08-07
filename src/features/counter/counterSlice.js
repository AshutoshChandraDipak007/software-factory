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
    increment: (state) => {
     state.value += 1;
    },
  
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    userLoggedIn: (state) => {
      debugger
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
    },
    
    useLoggedOut: (state) => {
      state.isLoggedIn = false;
    },

    setJwtToken:(state, action)=>{
      console.log(" state.jwtToken from reducer "+action.payload);
      state.jwtToken=action.payload;
    }
  },
 
});

export const { increment, decrement, incrementByAmount,userLoggedIn,useLoggedOut,setJwtToken } = counterSlice.actions;
export default counterSlice.reducer;
