import { GenericData } from "./generic-data.model";

export interface ChallengeData extends GenericData {
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