export const IN_ATOB_REGEX = /atob\(['|"](.*)['|"]\)\,/g;
export const IN_EVAL_REGEX = /eval\((.*)\)/g;
export const M3U8_LINK_REGEX = /http[^ ]*\.m3u8[^ | ^' | ^, | ^"]*/g;
export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
