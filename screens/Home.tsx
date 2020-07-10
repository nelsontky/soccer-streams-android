import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Components
import EventButton from "../components/EventButton";

// Extractor utils
import getLeagues from "../extractors/utils/getLeagues";

// Stubs
// import getLeagues from "../extractors/utils/getLeaguesStub";

// Types
import { StackParamList } from "../App";

// Filters
import {validStatuses} from "../filters"

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

// Styles
const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#dddddd",
  },
});

export interface Event {
  startTimestamp: number;
  startDate: string;
  hScore: number;
  vScore: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  statusDescription: string;
  hasStreams: boolean;
  redditEventLink: string | null;
}

export interface League {
  logo: string;
  uniqueName: string;
  order: number;
  country: { name: string };
  events: Event[];
}

export default function Home({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const [leagues, setLeagues] = useState<League[] | undefined>(undefined);

  useEffect(() => {
    getLeagues(new Date()).then((leagues) => setLeagues(leagues));
  }, []);

  if (leagues === undefined) {
    return <ActivityIndicator />;
  } else {
    return (
      <SectionList
        sections={leagues
          .filter((league) =>
            league.events.some((event) =>
              isValidEventStatus(event.statusDescription)
            )
          )
          .map((league) => ({
            title: league.country.name + " " + league.uniqueName,
            data: league.events.filter((event) =>
              isValidEventStatus(event.statusDescription)
            ),
          }))}
        renderItem={({ item }: { item: Event }) => (
          <EventButton
            event={item}
            onPress={() =>
              navigation.navigate("Event", {
                redditEventLink: item.redditEventLink,
              })
            }
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    );
  }
}

function isValidEventStatus(eventStatus: string): boolean {
  if (!isNaN(parseInt(eventStatus))) {
    // event status is a number
    return true;
  }
  return validStatuses[eventStatus];
}
