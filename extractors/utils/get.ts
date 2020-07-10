import axios, { AxiosRequestConfig } from "axios";

function getHtmlConfig(url: string, referer?: string): AxiosRequestConfig {
  if (referer === undefined) {
    return {
      method: "get",
      url,
      headers: {
        Referer: url,
      },
    };
  } else {
    return {
      method: "get",
      url,
      headers: {
        Referer: referer,
      },
    };
  }
}

function getJsonConfig(url: string): AxiosRequestConfig {
  return {
    method: "get",
    url,
    headers: {
      accept: " application/json, text/plain, */*",
      "accept-language": " en-US,en;q=0.9",
    },
  };
}

export async function getHtmlFromUrl(
  url: string,
  referer?: string
): Promise<string> {
  return referer === undefined
    ? (await axios(getHtmlConfig(url))).data
    : (await axios(getHtmlConfig(url, referer))).data;
}

export async function getJsonFromUrl(url: string) {
  return (await axios(getJsonConfig(url))).data;
}
