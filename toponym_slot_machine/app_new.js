import typonym_json from "./data_structured.json" assert { type: "json" };
export function roll() {
  let keys = Object.keys(typonym_json);
  console.log(keys);
  console.log("hello world");
}
