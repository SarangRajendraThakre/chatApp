import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HomeComponent from '@/components/HomeComponent'

export default function _layout() {
  return (
   
    <Stack>
       <Stack.Screen
         name='home'     
         options={
          {
            header: ()=> <HomeComponent/>
          }
         }
         />

    </Stack>
  )
}