import { GenericData, GenericListResult } from "./generic-data";

export interface ExerciseData extends GenericData {
  data: Data
}

export interface Data extends GenericListResult {
  exercises: Exercise[]
}

export interface Exercise {
  id: number,
  name: string,
  description: string,
  equipment: string,
  category: string,
  image: string,
  video: string,
  series: number,
  repetitions: Repetition[],
  methodology: string,
  rest: number
}

export interface Repetition {
  id: number,
  repetitions: number
}