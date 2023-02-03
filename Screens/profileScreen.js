import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

import * as Progress from "react-native-progress";
import tw from "tailwind-react-native-classnames";
import * as Icon from "react-native-feather";
import axios from "axios";

const checkValidLink = async (Link) => {
  try {
    const response = await axios.get(Link);
    return true;
  } catch (error) {
    return false;
  }
};

export default function ProfileScreen({ navigation, route }) {
  if (route.params.data.cursus_users[2])
    route.params.data.cursus_users[0] = route.params.data.cursus_users[2];

  const data = {
    username: route.params.data.login,
    Image_profile: route.params.data.image_url,
    displayname: route.params.data.displayname,
    level: route.params.data.cursus_users[0].level,
    ProgressBar:
      route.params.data.cursus_users[0].level -
      parseInt(route.params.data.cursus_users[0].level),
    wallet: route.params.data.wallet,
    grade: route.params.data.cursus_users[0].grade,
    skills: route.params.data.cursus_users[0].skills,
    correction_point: route.params.data.correction_point,
    location: route.params.data.location,
    email: route.params.data.email,
    campusName: route.params.data.campus[0].name,
    projects_users: route.params.data.projects_users,
  };
  const profileImg = {
    uri: data.Image_profile,
    width: 180,
    height: 180,
  };
  return (
    <ScrollView>
      <View style={tw`flex-auto items-center justify-center p-10`}>
        <Image style={tw`rounded-full`} source={profileImg} />
        <Text style={tw`text-black font-semibold text-3xl pt-5`}>
          {data.displayname}
        </Text>
        <Text style={tw`text-black font-semibold text-xl`}>
          {data.username}
        </Text>
      </View>
      <View
        style={tw`rounded-t-full bg-black flex-row items-center justify-center p-8 `}
      />
      <View style={tw`bg-black items-center justify-center pb-7`}>
        <View style={tw`bg-black flex-row items-center justify-center pb-3`}>
          <View>
            <Text style={tw`text-white font-semibold text-xl mb-3`}>
              Wallet
            </Text>
            <Text style={tw`text-white ml-3 text-xl`}>{data.wallet} ₳</Text>
          </View>
          <View style={tw`mx-8`}>
            <Text style={tw`text-white font-semibold text-xl mb-3`}>
              Evaluation points
            </Text>
            <Text style={tw`text-white ml-16 text-xl`}>
              {data.correction_point}
            </Text>
          </View>
          <View>
            <Text style={tw`text-white font-semibold text-xl mb-3`}>Grade</Text>
            <Text style={tw`text-white text-xl`}>{data.grade}</Text>
          </View>
        </View>
        <Text style={tw` text-white font-bold text-lg mt-2`}>
          level {data.level}%
        </Text>
        <Progress.Bar
          style={tw`mt-2`}
          progress={data.ProgressBar}
          width={350}
          height={25}
          color={"white"}
        />

        <View
          style={tw`mt-5 bg-white rounded-lg py-8 px-28 items-center justify-center mb-5`}
        >
          <Text style={tw`text-black font-bold text-xl mb-2`}>
            {data.location ? "Available" : "Unavailable"}
          </Text>
          <Text style={tw`text-black font-bold text-xl `}>
            {data.location ? data.location : "-"}
          </Text>
        </View>
        <View style={tw`flex-row mb-3`}>
          <Icon.Mail stroke="black" fill="#fff" width={32} height={32} />
          <Text style={tw`pl-2 text-white font-bold text-xl `}>
            {data.email}
          </Text>
        </View>
        <View style={tw`flex-row`}>
          <Icon.MapPin stroke="black" fill="#fff" width={32} height={32} />
          <Text style={tw`pl-2 text-white font-semibold text-xl `}>
            {data.campusName}
          </Text>
        </View>
      </View>
      {/* Project Users */}
      <View style={{ height: 300, marginTop: 20 }}>
        {/* Project Users */}
        <View style={tw` `}>
          {/* Header */}
          <View style={tw` items-center justify-center`}>
            <Text style={tw`pb-8 text-black font-semibold text-3xl `}>
              Projects
            </Text>
          </View>

          {/* Content */}
          <ScrollView vertical={true}>
            <View style={tw`p-5 `}>
              {data.projects_users.map((projects_user, id) =>
                !projects_user.project.parent_id ? (
                  <View key={id}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={tw`text-black font-semibold text-lg`}>
                        {projects_user.project.slug}
                      </Text>
                      <Text
                        style={{
                          color: !projects_user.final_mark ? "red" : "green",
                          paddingRight: 10,
                        }}
                      >
                        {projects_user.final_mark}
                        {projects_user.status === "finished" ? (
                          <Text> </Text>
                        ) : (
                          <Text
                            style={tw`text-black font-semibold text-gray-400 `}
                          >
                            in_progress
                          </Text>
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 0,
                        backgroundColor: "#A9A9A9",
                      }}
                    />
                  </View>
                ) : null
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Project Users */}
      <View style={{ height: 300, marginTop: 90, marginBottom: 100 }}>
        {/* Project Users */}
        <View style={tw` `}>
          {/* Header */}
          <View style={tw` items-center justify-center`}>
            <Text style={tw`pb-8 text-black font-semibold text-3xl `}>
              Skills
            </Text>
          </View>

          {/* Content */}
          <ScrollView vertical={true}>
            <View style={tw`p-5 `}>
              {data.skills.map((skills, id) => (
                <View key={id}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={tw`text-black font-semibold text-lg`}>
                      {skills.name}
                    </Text>
                    <Text
                      style={{
                        color: "green",
                        paddingRight: 10,
                      }}
                    >
                      {skills.level}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 0,
                      backgroundColor: "#A9A9A9",
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
