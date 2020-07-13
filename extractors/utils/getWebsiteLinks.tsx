import $ from "cheerio";
import url from "url";

import delay from "./delay";
import supportedSites from "./supportedSites";
import { getHtmlFromUrl } from "./get";

export interface WebsiteLinkInformation {
  channelName: string;
  quality: string;
  websiteLink: string;
  language: string;
}

/**
 * Get all website links from redditEventLink
 * @param redditEventLink Link to get stream links from
 */
export default async function getWebsiteLinks(
  redditEventLink: string | null
): Promise<WebsiteLinkInformation[]> {
  if (redditEventLink === null) {
    return [];
  }

  const pathName = url.parse(redditEventLink).pathname;

  if (pathName === null) {
    return [];
  }

  const html = await getHtmlFromUrl(
    `https://101placeonline.com/streams-table/${
      pathName.split("/").reverse()[0]
    }/soccer`
  );

  let websiteLinkInformations: WebsiteLinkInformation[] = [];

  const titleElements: Cheerio = $(html)
    .find("div.col-lg")
    .first()
    .find("div.stream-item");

  titleElements.each((_, element: CheerioElement) => {
    const channelName: string = $(element)
      .find("span.label-channel-name")
      .first()
      .text()
      .trim();

    const quality: string = $(element)
      .find("span.label-danger")
      .first()
      .text()
      .trim();

    const websiteLink: string | undefined = $(element)
      .find("a.stream-info")
      .first()
      .attr("href");

    const language: string | undefined = $(element)
      .find("span.language")
      .first()
      .text()
      .trim();

    if (websiteLink !== undefined) {
      const websiteDomain: string | null = url.parse(websiteLink).hostname;

      if (websiteDomain === null) {
        return [];
      }

      if (supportedSites[websiteDomain]) {
        websiteLinkInformations.push({
          channelName,
          quality,
          websiteLink,
          language,
        });
      }
    }
  });

  return websiteLinkInformations;
}
