import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const token=sessionStorage.getItem("jwtToken");
const AuthStr =(token==""||token==undefined ||token==null)? null:'Bearer '.concat(sessionStorage.getItem("jwtToken"));

   export async function GET(endUrl){
    debugger;
    try{
        const response=await axios.get(`${endUrl}`,AuthStr);
        console.log(`Response : ${response}`);
        return response;
    }
    catch(error){
      console.error(`ERROR: ${error}`);    
    }
   }


   export async function CREATE(endUrl,values){
    debugger;
    try{
        const response=await axios.post(`${endUrl}`,values,AuthStr);
        console.log(`Response : ${response}`);
        return response;
    }
    catch(error){
      console.error(`ERROR: ${error}`);    
    }
   }

   
   export async function DELETE(endUrl){
    debugger;
    try{
        const response=await axios.delete(`${endUrl}`,AuthStr);
        console.log(`Response : ${response}`);
        return response;
    }
    catch(error){
      console.error(`ERROR: ${error}`);    
    }
   }
   

