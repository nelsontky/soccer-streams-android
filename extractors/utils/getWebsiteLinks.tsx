import $ from "cheerio";
import url from "url";

import supportedSites from "./supportedSites";
import { getHtmlFromUrl } from "./get";

export interface WebsiteLinkInformation {
  channelName: string;
  quality: string;
  websiteLink: string;
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

  let index = 1;

  titleElements.each(function (_, element: CheerioElement) {
    const quality: string = $(element)
      .find("span.label-danger")
      .first()
      .text()
      .trim();

    const websiteLink: string | undefined = $(element)
      .find("a.stream-info")
      .first()
      .attr("href");

    if (websiteLink !== undefined) {
      const websiteDomain: string | null = url.parse(websiteLink).hostname;

      if (websiteDomain === null) {
        return [];
      }

      if (supportedSites[websiteDomain]) {
        websiteLinkInformations.push({
          channelName: `Link ${index}: ${websiteDomain}`,
          quality,
          websiteLink,
        });

        index++;
      }
    }
  });

  return websiteLinkInformations;
}
