import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import * as IntentLauncher from "expo-intent-launcher";

import url from "url";

// Types
import { StackParamList } from "../App";

// Styles
import { styles } from "../components/EventButton";

// Extractor Utils
// import getWebsiteLinks, {
//   WebsiteLinkInformation,
// } from "../extractors/utils/getWebsiteLinks";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

// Extractors
import daddylive from "../extractors/daddylive";
import simpleFind from "../extractors/common-extractors/simpleFind";
import streamCr7 from "../extractors/stream-cr7";

// Stubs
import getWebsiteLinks, {
  WebsiteLinkInformation,
} from "../extractors/utils/getWebsiteLinksStub";

type EventScreenRouteProp = RouteProp<StackParamList, "Event">;
type EventScreenNavigationProp = StackNavigationProp<StackParamList, "Event">;

// Interfaces
interface EventProps {
  route: EventScreenRouteProp;
  navigation: EventScreenNavigationProp;
}

const MISSING_MSG: string =
  "No streams available yet, streams will appear around 30 mins prior to kick-off. If the game is already on going, there is a high chance that there are no links for this game. Game may be over too.";

export default function Event({ route, navigation }: EventProps) {
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
              onPress={genOnPress(item.websiteLink, navigation)}
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

function genOnPress(
  websiteLink: string,
  navigation: EventScreenNavigationProp
): () => void {
  return async () => {
    const websiteDomain: string | null = url.parse(websiteLink).hostname;

    if (websiteDomain === null) {
      throw new Error(`${websiteLink} parse error`);
    }

    let m3u8Link: string | undefined = undefined;

    try {
      switch (websiteDomain) {
        case "daddylive.live":
          m3u8Link = await daddylive(websiteLink);
          break;
        default:
          m3u8Link = await simpleFind(websiteLink);
      }
    } catch (e) {
      // Any parsing errors, just ignore the url
      console.log(e.message);
    }

    if (m3u8Link !== undefined) {
      // Add url check here

      const result: IntentLauncher.IntentLauncherResult = await IntentLauncher.startActivityAsync(
        "android.intent.action.VIEW",
        {
          packageName: "org.videolan.vlc",
          data: m3u8Link,
          type: "video/*",
        }
      );

      if (result.resultCode === IntentLauncher.ResultCode.Canceled) {
        throw new Error(
          "Install VLC from Google Play Store, before trying again and opening link with VLC"
        );
      }
    } else {
      throw new Error("Link is not available, try another link!");
    }
  };
}
