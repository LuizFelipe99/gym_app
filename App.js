import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/pages/Login';
import Main from './src/pages/Main';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen name="Main" component={Main}
         options={{
          headerShown: false,
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;