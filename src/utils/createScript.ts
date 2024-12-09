export const createScript = (src: string | null, text?: string) => {
  const newScript = document.createElement("script");
  newScript.type = "text/javascript";
  if (src) {
    newScript.src = src;
  }
  if (text) {
    newScript.text = text;
  }
  return newScript;
};
