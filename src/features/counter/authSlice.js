import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  jwtToken:"",
  isLoggedIn:true,
  isAdmin:false,
  userList:[],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {   
    userLoggedIn: (state) => {
       // debugger
        state.isLoggedIn = true;
        console.log(state.isLoggedIn);
      },

      userRole: (state) => {
         state.isAdmin = true;
       },
      
      userLoggedOut: (state) => {
        state.isLoggedIn = false;
        state.jwtToken=null;
      },
  
      setJwtToken:(state, action)=>{
        //console.log(" state.jwtToken from reducer "+action.payload);
        state.jwtToken=action.payload;
      }  
  },
 
});

export const {userLoggedIn,setJwtToken,userLoggedOut,userRole} = authSlice.actions;
export default authSlice.reducer;
