import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  jwtToken:"",
  isLoggedIn:false,
  isAdmin:false,
  userList:[],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {   
    userLoggedIn: (state) => {
        state.isLoggedIn = true;
        console.log(state.isLoggedIn);
      },

      userRole: (state) => {
         state.isAdmin = true;
       },
      
      userLoggedOut: (state) => {
        state.isLoggedIn = false;
        state.jwtToken=null;
        state.isAdmin=false;
      },
  
      setJwtToken:(state, action)=>{
        state.jwtToken=action.payload;
      }  
  },
 
});

export const {userLoggedIn,setJwtToken,userLoggedOut,userRole} = authSlice.actions;
export default authSlice.reducer;
