// utils/mappers.ts

export const mapRecordToArray = <T>(record: Record<string, T>): T[] =>
  Object.values(record);
