import { Exercise } from "./exercise";
import { GenericData, GenericListResult } from "./generic-data";


export interface TrainingData extends GenericData {
  data: Data
}

export interface UserTrainingData extends GenericData {
  data: Training[];
}

export interface Data extends GenericListResult {
  trainings: Training[]
}

export interface Training {
  id: number,
  name: string,
  expire_date: string,
  description: string,
  category: string,
  duration: number,
  todayTraining: boolean,
  exercises: Exercise[]
}

export interface CreatedTrainingData extends GenericData {
  data: Training;
}
