import { combineReducers } from "redux";
import { studentReducer, StudentState } from "./student.reducer";
import { trainerReducer, TrainerState } from "./trainer.reducer";

export interface BaseState {
  studentReducer: StudentState;
  trainerReducer: TrainerState;
}

export const reducers = combineReducers<BaseState>({
  studentReducer,
  trainerReducer
});