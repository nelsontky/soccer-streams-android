import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Interfaces
import { Event } from "../screens/Home";

// Styles
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  buttonItemLarge: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonItemMiddle: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonItemText: {
    alignSelf: "center",
  },
});

export default function EventButton({
  event,
  onPress,
}: {
  event: Event;
  onPress: () => void;
}) {
  const homeTeam: string = event.homeTeam.name;
  const awayTeam: string = event.awayTeam.name;
  const matchStatus: string =
    event.statusDescription === "NS"
      ? getTimeFromUnix(event.startTimestamp)
      : event.statusDescription + "'";
  const scoreBoard: string = event.hScore + " - " + event.vScore;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <View style={styles.buttonItemLarge}>
            <Text style={styles.buttonItemText}>{homeTeam}</Text>
          </View>
          <View style={styles.buttonItemMiddle}>
            <Text style={styles.buttonItemText}>{matchStatus}</Text>
            <Text style={styles.buttonItemText}>{scoreBoard}</Text>
          </View>
          <View style={styles.buttonItemLarge}>
            <Text style={styles.buttonItemText}>{awayTeam}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function getTimeFromUnix(unix: number): string {
  const date = new Date(unix * 1000);

  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}
