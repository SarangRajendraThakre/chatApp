import { View, Text, TouchableOpacity, _View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
const ChatRoomHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: " ",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className=" flex-row items-center  gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className=" flex-row items-center gap-3 ">
              <Image
                source={user?.profileUrl}
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
              />

              <Text
                style={{ fontSize: hp(2.5) }}
                className=" text-neutral-700 font-medium "
              ></Text>
            </View>
          </View>
        ),
        headerRight: () => {
          <View className=" flex-row items-center gap-8">
            <Ionicons name="call" size={hp(2.8)} color={"#737373"} />
            <Ionicons name="videocam" size={hp(2.8)} color={"#737373"} />
          </View>;
        },
      }}
    />
  );
};

export default ChatRoomHeader;
