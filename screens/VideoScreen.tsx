import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Video } from "expo-av";
import { RouteProp } from "@react-navigation/native";

import { StackParamList } from "../App";

type VideoScreenRouteProp = RouteProp<StackParamList, "Stream">;

interface VideoScreenProp {
  route: VideoScreenRouteProp;
}

export default function VideoScreen({ route }: VideoScreenProp) {
  // Set video dimension based on its width, so the video doesn't stretched on any devices.
  // The video dimension ratio is 11 : 9 for width and height
  const videoWidth = Dimensions.get("window").width;
  const videoHeight = (videoWidth / 11) * 9;

  console.log(route.params.url);

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: route.params.url,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        style={{ width: videoWidth, height: videoHeight }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
