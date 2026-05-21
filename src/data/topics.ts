import type { Topic } from "../types";
import { intTopic, floatTopic, stringTopic, boolTopic } from "./topics_part1";
import { listTopic, tupleTopic, dictTopic } from "./topics_part2";
import { setTopic, noneTopic, complexTopic, bytesTopic } from "./topics_part3";

export const ALL_TOPICS: Topic[] = [
  intTopic,
  floatTopic,
  stringTopic,
  boolTopic,
  listTopic,
  tupleTopic,
  dictTopic,
  setTopic,
  noneTopic,
  complexTopic,
  bytesTopic,
];

export function getTopicById(id: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === id);
}
