import { View, Text, Platform } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { useAuth } from "@/context/authContext";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Image } from "expo-image";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./commonMenuItem";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ios = Platform.OS == "ios";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const HomeComponent = () => {
  const { user, logout } = useAuth();

  const { top } = useSafeAreaInsets();

  const handleProfile = () => {};

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className=" flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl  shadow "
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className=" font-medium text-white ">
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {},
            }}
          >
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash} // Replace with valid blurhash string
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{
            optionsContainer: {
              borderRadius: 10 , 
              borderCurve: 'continuous',
              marginTop:40 , 
              marginLeft: -30 , 
              backgroundColor : 'white',
              shadowOpacity : 0.2 , 
              shadowOffset : {width : 0 , height : 0 },
              width: 160 

            }
          }}>
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />

            <Divider />

            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={
                <FontAwesome name="sign-out" size={hp(2.5)} color="#737373" />
              }
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeComponent;

const Divider = () => {
  return (

    <View className=" p-[1px] w-full bg-neutral-200" />

  )
};
