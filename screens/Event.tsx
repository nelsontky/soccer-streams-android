import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";

import url from "url";

// Types
import { StackParamList } from "../App";

// Styles
import { styles } from "../components/EventButton";

// Extractor Utils
import getWebsiteLinks, {
  WebsiteLinkInformation,
} from "../extractors/utils/getWebsiteLinksStub";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

// Extractors
import daddylive from "../extractors/daddylive";
import simpleFind from "../extractors/common-extractors/simpleFind";
import streamCr7 from "../extractors/stream-cr7";

type EventScreenRouteProp = RouteProp<StackParamList, "Event">;

// Interfaces
interface EventProps {
  route: EventScreenRouteProp;
}

const MISSING_MSG: string =
  "No streams available yet, streams will appear around 30 mins prior to kick-off. If the game is already on going, there is a high chance that there are no links for this game. Game may be over too.";

export default function Event({ route }: EventProps) {
  const [websiteLinkInformations, setWebsiteLinkInformations] = useState<
    WebsiteLinkInformation[] | undefined
  >(undefined);

  useEffect(() => {
    getWebsiteLinks(
      route.params.redditEventLink
    ).then((websiteLinkInformations) =>
      setWebsiteLinkInformations(websiteLinkInformations)
    );
  }, []);

  if (websiteLinkInformations == undefined) {
    return <ActivityIndicator />;
  } else if (websiteLinkInformations.length === 0) {
    return (
      <View>
        <Text>{MISSING_MSG}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={websiteLinkInformations.map((websiteLinkInformation, i) => ({
            ...websiteLinkInformation,
            key: i.toString(),
          }))}
          renderItem={({ item }: { item: WebsiteLinkInformation }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={genOnPress(item.websiteLink)}
            >
              <Text style={styles.buttonItemText}>
                {item.channelName + " " + item.quality}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

function genOnPress(websiteLink: string): () => void {
  return async () => {
    const websiteDomain: string | null = url.parse(websiteLink).hostname;

    if (websiteDomain === null) {
      throw new Error(`${websiteLink} parse error`);
    }

    let m3u8Link: string;

    switch (websiteDomain) {
      case "stream-cr7.net":
        m3u8Link = await streamCr7(websiteLink);
        break;
      case "daddylive.live":
        m3u8Link = await daddylive(websiteLink);
        break;
      default:
        m3u8Link = await simpleFind(websiteLink);
    }

    console.log(m3u8Link);
  };
}
