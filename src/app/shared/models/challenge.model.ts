import { GenericData, GenericListResult } from "./generic-data.model";

export interface ChallengeData extends GenericListResult {
    data: Data;
}

export interface Data {
    challenges: Challenge[];
}

export interface todayChallengeData extends GenericData {
    data: Challenge[];
}

export interface Challenge {
    id: number;
    name: string;
    description: string;
    image: string;
    points: number;
    active: boolean;
    difficulty: string;
    weekDay: string;
    startDate: string;
    endDate: string;
    created_at: string;
    updated_at: string;
} 