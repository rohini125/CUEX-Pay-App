import React from "react";
import {StyleSheet,View} from 'react-native';
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 ,MaterialIcons} from '@expo/vector-icons';

const TabRoot = () =>{

    return (
        <Tabs 
            screenOptions={{
                tabBarActiveTintColor: 'white', // Active tab icon color
                // tabBarInactiveTintColor: 'gray', // Inactive tab icon color            
                tabBarStyle: { backgroundColor: '#000000' ,}, // Optional: Tab bar background color
                headerShown: false,
                
            }}
            
        >
           <Tabs.Screen 
              name="front" 
              options={{title:" Home ",  
              tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />
            }} />
            <Tabs.Screen
                name="market"
                options={{title:" Market ",
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="line-chart" color={color} /> 
            }}/>

            <Tabs.Screen
                    name="scanner"
                    options={{
                    title: " ",
                    tabBarIcon: ({ color,size }) => {
                        return(
                            <View
                                style = {{
                                    width: 55,
                                    height: 55,
                                    backgroundColor: '#fff',
                                    borderRadius: 30,
                                    // borderColor:'black',
                                    // borderWidth: 0.5,
                                    marginBottom:20,
                                    justifyContent:'center',
                                    alignItems:'center',
                                }}
                            >
                               <MaterialIcons name="qr-code-scanner" size={28} color={'black'} />
                            </View>
                        );
                    },
                }}
            />
            
            <Tabs.Screen 
                name="wallet"
                options={{title:" Wallet ",
                tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="wallet" color={color} /> 
             }}/>
            <Tabs.Screen
             name="history"
             options={{title:" History ",
             tabBarIcon: ({ color }) => <FontAwesome size={24} name="history" color={color} />
            }}/>
        </Tabs>
    );
};

export default TabRoot;

const styles=StyleSheet.create({
    scanner:{
        backgroundColor:'blue',
        color:'white',
        padding:8,
        borderRadius:"50%",
        marginBottom:25,
    },
});