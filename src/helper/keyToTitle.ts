export default function keyToTitle(key: string) {
  return key.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
