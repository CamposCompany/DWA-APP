import { Exercise } from "../../shared/models/exercise";

export interface ExerciseViewState {
    id?: string;
    exercises: Exercise[];
    currentIndex: number;
    selectedExerciseId: number | null;
    source: 'training' | 'user-training' | 'all';
    completedSeries: { [exerciseId: number]: number[] };
    currentSeries: { [exerciseId: number]: number };
}
  
export const initialState: ExerciseViewState = {
    exercises: [],
    currentIndex: 0,
    selectedExerciseId: null,
    source: 'all',
    completedSeries: {},
    currentSeries: {}
};
  