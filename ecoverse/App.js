

import { AuthProvider } from './AuthContext.js';

import AppIn from './AppIn.js'
export default function App() {
  
  return (
    <AuthProvider>
       <AppIn></AppIn>
   </AuthProvider>
  );
}