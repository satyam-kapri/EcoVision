
import { useState } from "react";
import Main from "./screens/Main.js";
import Welcome from "./screens/Welcome.js";
import { useAuth } from './AuthContext';
export default function AppIn() {
  const {user}=useAuth();
  return (
   <>
       {
        !user?<Welcome ></Welcome>:   
        <Main></Main>
       }
</>
  );
}