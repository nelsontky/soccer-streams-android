import React, { useState, useEffect } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import * as IntentLauncher from "expo-intent-launcher";

import Loading from "../components/Loading";

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

  const [isLoadingStream, setIsLoadingStream] = useState<boolean>(false);

  useEffect(() => {
    getWebsiteLinks(
      route.params.redditEventLink
    ).then((websiteLinkInformations) =>
      setWebsiteLinkInformations(websiteLinkInformations)
    );
  }, []);

  if (websiteLinkInformations === undefined || isLoadingStream) {
    return <Loading />;
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
              onPress={async () => {
                setIsLoadingStream(true);
                try {
                  await scrapeAndOpenStream(item.websiteLink, () =>
                    setIsLoadingStream(false)
                  );
                } catch (e) {
                  ToastAndroid.show(e.message, ToastAndroid.LONG);
                }
              }}
            >
              <Text style={styles.buttonItemText}>
                {item.channelName + " " + item.quality + " " + item.language}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

async function scrapeAndOpenStream(
  websiteLink: string,
  setLoadCompleted: () => void
): Promise<void> {
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
    // Any parsing errors, throw error
    throw new Error("Stream is not available, try another stream!");
  } finally {
    setLoadCompleted();
  }

  // Add url check here

  const result: IntentLauncher.IntentLauncherResult = await IntentLauncher.startActivityAsync(
    "android.intent.action.VIEW",
    {
      packageName: "com.mxtech.videoplayer.ad",
      data: m3u8Link,
    }
  );

  if (result.resultCode === IntentLauncher.ResultCode.Canceled) {
    throw new Error(
      "Install MX Player from Google Play Store, before trying again and opening stream with MX Player"
    );
  }
}
