import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import Feather from "@expo/vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import MessageList from "@/components/MessageList";
import { useAuth } from "@/context/authContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getRoomId } from "@/utils/common";

const ChatRoom = () => {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth();
  const router = useRouter();
  console.log("got item data:", item);

  const textRef = useRef("");
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const ScrollViewRef = useRef(null)

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListner = Keyboard.addListener(
      'keyboardDidShow' , updateScrollView
    )

    return ()=>{
      unsub();
      KeyboardDidShowListner.remove();
    }
  }, []);

  useEffect(()=>{
      updateScrollView()
  },[messages])

  const updateScrollView = () =>{
    setTimeout(()=>{
            ScrollViewRef?.current?.scrollToEnd({animated:false})
    },100)
  }

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };




  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("new message id : ", newDoc.id);
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  console.log(messages);
  return (
    <CustomKeyboardView inChat={true}>
      <View className=" flex-1 bg-white ">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className=" h-3 border-b border-neutral-300  " />
        <View className=" flex-1  justify-between bg-neutral-100 overflow-visible ">
          <View className=" flex-1">
            <MessageList ScrollViewRef={ScrollViewRef} messages={messages} currentUser={user} />
          </View>

          <View style={{ marginBottom: hp(1.7) }} className=" pt-2">
            <View className=" flex-row  justify-between items-center mx-3 p-2 bg-white border-neutral-300   ">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message.."
                style={{ fontSize: hp(2) }}
                className=" flex-1 mr-2"
              />

              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
