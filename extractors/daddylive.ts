import $ from "cheerio";

import { getHtmlFromUrl } from "./utils/get";
import wstream from "./common-extractors/wstream";

const TEST_LINK = "https://daddylive.live/channels/stream-43.php";

export default async function daddylive(link: string) {
  const html = await getHtmlFromUrl(link);

  const wstreamIframe: Cheerio = $(html).find(
    "iframe[src^='https://wstream.to/embed/']"
  );

  const wstreamLink: string | undefined = wstreamIframe.attr("src");

  if (wstreamLink === undefined) {
    throw new Error(`${link} parsing error`);
  }

  return await wstream(wstreamLink, link);
}
