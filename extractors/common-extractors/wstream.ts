const matchAll = require("string.prototype.matchall");

import { getHtmlFromUrl } from "../utils/get";
import { IN_EVAL_REGEX, URL_REGEX } from "../utils/regexes";

const TEST_LINK = "https://wstream.to/embed/7ksvk1ppa";

export default async function wstream(link: string, referer: string) {
  const html: string = await getHtmlFromUrl(link, referer);

  const matches: RegExpMatchArray[] = [...matchAll(html, IN_EVAL_REGEX)];

  if (matches.length < 1 || matches[0].length < 2) {
    throw new Error(`${link} parsing error`);
  }

  const stringToEval: string = "(" + matches[0][1] + ")";
  const clapprCode: string = eval(stringToEval);

  const m3u8Link: RegExpMatchArray | null = clapprCode.match(URL_REGEX);

  if (m3u8Link === null) {
    throw new Error(`${link} parsing error`);
  }

  return m3u8Link[0];
}
