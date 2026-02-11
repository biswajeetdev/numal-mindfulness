import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { ElevenLabsProvider } from "@elevenlabs/react-native";
import { config } from "@/utils/config";


 function RootLayoutWithAuth() {
  const {isSignedIn, isLoaded} = useAuth();

  if(!isLoaded){
    //Loaded state
    return null;
  }

  return (
  <ElevenLabsProvider>

    <Stack>
      
      <Stack.Protected
      guard ={isSignedIn}
      >
      <Stack.Screen name ="(protected)" options={{headerShown : false}}/>
      </Stack.Protected>
      
      <Stack.Protected
      guard ={!isSignedIn}
      >
      <Stack.Screen name ="(public)" options={{headerShown : false}}/>
      </Stack.Protected>
      

    </Stack>
  </ElevenLabsProvider>


  );
}

    export default function RootLayout() {
      
      return (
        <ClerkProvider
      
        tokenCache={tokenCache}
        publishableKey={config.clerk.publishableKey}
        >


        


      <RootLayoutWithAuth/>
      </ClerkProvider>
      
  );
}
