import { getJsonFromUrl } from "../utils/get";

/**
 * Get all the matches from footybite api
 * @param date Get matches played on this date
 */
export default async function getLeagues(date: Date) {
  const timezoneOffset: number = new Date().getTimezoneOffset();

  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
  const day: string = (date.getDate() - 1).toString().padStart(2, "0");

  return await getJsonFromUrl(
    `https://darsh.sportsvideo.net/new-api/matches?timeZone=${timezoneOffset}&date=${
      year + "-" + month + "-" + day
    }`
  );
}
