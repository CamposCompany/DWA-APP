import { Exercise } from "../../shared/models/exercise";

export interface ExerciseViewState {
    exercises: Exercise[];
    currentIndex: number;
    selectedExerciseId: number | null;
    source: 'training' | 'user-training' | 'all';
}
  
export const initialState: ExerciseViewState = {
    exercises: [],
    currentIndex: 0,
    selectedExerciseId: null,
    source: 'all'
};
  