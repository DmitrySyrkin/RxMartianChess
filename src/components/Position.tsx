import {Figure} from "./Figure"

export type Position = {
    isRedTurn: boolean;
    figures: Figure[][];
    redScore: number;
    blueScore: number;
}