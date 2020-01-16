import React from "react";
import { View } from "react-native";

import { WebView } from "react-native-webview";

const Profile = ({ navigation }) => {
  const github_username = navigation.getParam("github_username");

  return (
    <WebView
      source={{ uri: `http://github.com/${github_username}` }}
      style={{ flex: 1 }}
    />
  );
};

export default Profile;
