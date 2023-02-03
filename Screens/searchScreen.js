import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import Image_42 from "../image/school_42.jpeg";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";

// POST : Token

const Auth_url = "https://api.intra.42.fr/oauth/token/";
const postAuth = async () => {
  try {
    const response = await axios.post(Auth_url, {
      grant_type: "client_credentials",
      client_id:
        "u-s4t2ud-c25a45a0ef679e46ce27e2879d3061d301bff75102eefc1e1c9b396ca63f0b45",
      client_secret:
        "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",
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// Storage data

const storeData = async () => {
  const Auth = await postAuth();
  try {
    await AsyncStorage.setItem("auth", JSON.stringify(Auth));
    return Auth;
  } catch (error) {
    return null;
  }
};

// Retrieve data

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("auth");
    if (!value) return null;
    let parsed = JSON.parse(value);
    if (parsed !== null) return parsed;
  } catch (error) {
    return null;
  }
};

// Auth : Check expired Date
// case 1 - Auth expired
// case 2 - never stored befor

const authExpiredChecker = async () => {
  const userAuth = await retrieveData();
  const toDayTime = Math.abs(new Date().getTime() / 1000);
  if (!userAuth) {
    //userAuth = await storeData();
  } else if (
    userAuth &&
    toDayTime >= userAuth.created_at + userAuth.expires_in
  ) {
    userAuth = await storeData();
  }
  return userAuth;
};

// ***** end of AUTH functions ***** //

// Get : user Data

const User_url = "https://api.intra.42.fr/v2/users/";
const getData = async (Auth, username) => {
  try {
    const response = await axios.get(User_url + username.toLowerCase().trim(), {
      headers: { Authorization: `Bearer ${Auth.access_token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// Main functions

const mainFunctions = async (username) => {
  const Auth = await authExpiredChecker();
  let data = null;
  if (Auth) data = await getData(Auth, username);
  return data;
};

// SearchScreen

export default function SearchScreen({ navigation }) {
  const [searchContent, setsearchContent] = useState("");
  const [error, seterror] = useState("");

  const Submithandler = async () => {
    let data = {};
    if (searchContent === "") Alert.alert("Username : Required");
    else if (!(data = await mainFunctions(searchContent)))
      Alert.alert("Username : Invalid");
    searchContent && data ? navigation.navigate("Profile", { data: data }) : "";
  };

  useEffect(() => {
    seterror("");
  }, [searchContent]);

  return (
    <View style={tw`flex-auto bg-black items-center justify-center`}>
      <Image source={Image_42} style={styles.Image_42} />
      {error ? <Text style={tw`text-red-500 mb-5`}> {error}</Text> : null}
      <TextInput
        style={tw`w-2/3 bg-gray-200 border-2 rounded py-2 px-4 text-gray-700 mb-10 ${
          error ? "border-red-500" : "border-gray-200"
        } `}
        placeholder="Username"
        name="username"
        onChangeText={(newText) => setsearchContent(newText)}
        value={searchContent}
      />
      <Button
        mode="contained"
        onPress={Submithandler}
        style={tw`flex bg-gray-100 `}
      >
        <Text style={tw`text-black`}> Search </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  Image_42: {
    width: 170,
    height: 170,
  },
});
