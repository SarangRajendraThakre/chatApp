import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { MenuProvider } from 'react-native-popup-menu';
 
const MainLayout = () => {
    
    const {isAuthenticated} = useAuth();
 
    const segments = useSegments();
    const router = useRouter();


    useEffect(()=>
          {

            
        if(typeof isAuthenticated == "undefined") return;      
        const inApp = segments[0] == "(app)";        

        if(isAuthenticated && !inApp) {
            
            router.replace("home");
        }
        else if(isAuthenticated == false ) {

            router.replace("SignIN");

    }
}
    ,[isAuthenticated])
    return <Slot/>

}





export default function RootLayout() {
  return (
    
    <MenuProvider>
     <AuthContextProvider>
        <MainLayout/> 
    </AuthContextProvider>
  </MenuProvider>

  
  )
}

