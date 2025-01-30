import { GenericData, GenericListResult } from "./generic-data";

export interface ExerciseData extends GenericData {
  data: Data
}

export interface Data extends GenericListResult {
  exercises: Exercise[]
}

export interface Exercise {
  id: number;
  name: string;
  exercise_id: number;
  user_trainingID: number;
  series: number;
  rest: number;
  description: string;
  equipment: string;
  category: string;
  image: string | null;
  video: string | null;
  comments: string | null;
  weight: number | null;
  active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  methodology: string | null;
  exercise_name: string;
  repetitions: Repetition[];
  exercise: ExerciseDetails;
}

export interface Repetition {
  id: number;
  training_exerciseID: number;
  repetitions: number;
  created_at: string;
  updated_at: string;
}

interface ExerciseDetails {
  id: number;
  name: string;
  description: string;
  equipment: string;
  category: string;
  image: string | null;
  video: string | null;
}