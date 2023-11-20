import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from  '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


import Home from '../Home';
import Profile from '../Profile';
import Workouts from '../Workouts';
import Detail from '../Detail';



const Tab = createBottomTabNavigator();

function Main() {

  const width = 30;
  const route = useRoute();
  const { user } = route.params;
  const idUser = user.userId;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle:{
              position: 'absolute',
              backgroundColor: '#085E90',
              borderTopWidth:0,
              height: 60,
              marginTop: 100,
            }
          }}
      >
        <Tab.Screen name="Home" component={Home} 
         options={{
          tabBarIcon: ({color, size, focused}) => {
            if(focused){
              return <Ionicons name="home-outline" size={width} color={color}/>
            }
            return <Ionicons name="home-outline" size={width} color={color}/>
          },
          headerShown: false,
        }}
        />
         <Tab.Screen 
         name="Workouts" 
         component={Workouts}
         initialParams={{user: idUser}}
          options={{
            tabBarIcon: ({color, size, focused}) => {
              if(focused){
                return <Ionicons name="md-barbell-outline" size={width} color={color}/>
              }
              return <Ionicons name="md-barbell-outline" size={width} color={color}/>
            },
          headerShown: false,
        }}
        />
          <Tab.Screen
            name="Detail" 
            component={Detail} 
            
            options={{
              tabBarIcon: ({color, size, focused}) => {
                if(focused){
                  return <Ionicons name="md-newspaper-outline" size={width} color={color}/>
                }
                return <Ionicons name="md-newspaper-outline" size={width} color={color}/>
              },
            headerShown: false,
          }}
          />
        <Tab.Screen
          name="Profile" 
          component={Profile} 
          initialParams={{user: idUser}}
          options={{
            tabBarIcon: ({color, size, focused}) => {
              if(focused){
                return <Ionicons name="person-sharp" size={width} color={color}/>
              }
              return <Ionicons name="person-sharp" size={width} color={color}/>
            },
          headerShown: false,
        }}
        />
        
        

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;