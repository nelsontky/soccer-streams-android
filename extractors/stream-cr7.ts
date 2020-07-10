import url from "url";
const matchAll = require("string.prototype.matchall");

import { IN_ATOB_REGEX } from "./utils/regexes";
import { getHtmlFromUrl } from "./utils/get";

const TEST_LINK = "http://stream-cr7.net/embed/2.php";

export default async function simpleFind(link: string): Promise<string> {
  const html = await getHtmlFromUrl(link);

  const matches: RegExpMatchArray[] = [...matchAll(html, IN_ATOB_REGEX)];

  if (matches.length < 1) {
    throw new Error(`${link} parsing error`);
  }

  if (matches[0].length < 2) {
    throw new Error(`${link} parsing error`);
  }

  const playlistLink: string = window.atob(matches[0][1]);

  const playlistInfo: string = await getHtmlFromUrl(playlistLink);
  const chunks: string[] = playlistInfo
    .split("\n")
    .filter((playlistLine) => playlistLine[0] !== "#");

  if (chunks.length < 1) {
    throw new Error(`${link} parsing error`);
  }

  const { protocol, hostname } = url.parse(playlistLink);

  if (protocol === undefined || hostname === undefined) {
    throw new Error(`${link} parsing error`);
  }

  return (
    protocol + "//" + hostname + "/" + chunks[0] // first link in playlist, highest quality
  );
}
