const MS_TO_DELAY = 1000;

export default function delay() {
  return new Promise((resolve, _) => {
    setTimeout(resolve, MS_TO_DELAY);
  });
}
