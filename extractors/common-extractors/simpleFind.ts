import { M3U8_LINK_REGEX } from "../utils/regexes";
import { getHtmlFromUrl } from "../utils/get";
const matchAll = require("string.prototype.matchall");

export default async function simpleFind(link: string): Promise<string> {
  const html = await getHtmlFromUrl(link);

  const matches: RegExpMatchArray[] = [...matchAll(html, M3U8_LINK_REGEX)];

  if (matches.length < 1) {
    throw new Error(`${link} parsing error`);
  }

  return matches[0].toString().replace(/playlist/g, "chunks");
}
