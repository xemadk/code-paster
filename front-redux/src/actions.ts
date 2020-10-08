import { actionIds } from './common';
import {BaseAction} from './reducers/baseAction'

export const studentStartAction = (roomId): BaseAction =>({
    type:actionIds.STUDENT_START,
    payload: roomId,
});

export const studentStopAction = (): BaseAction =>({
    type:actionIds.STUDENT_STOP,
    payload: null,
});

export const studentAppendLogAction = (newLog): BaseAction =>({
    type:actionIds.STUDENT_APPEND_LOG,
    payload: newLog,
});

export const studentFirstAction = (): BaseAction =>({
    type:actionIds.STUDENT_FIRST,
    payload: null,
});


export const trainerStartAction = (roomId): BaseAction =>({
    type:actionIds.TRAINER_START,
    payload: roomId,
});

export const trainerStopAction = (): BaseAction =>({
    type:actionIds.TRAINER_STOP,
    payload: null,
});

export const trainerWriteAction = (newLog): BaseAction =>({
    type:actionIds.TRAINER_WRITE,
    payload: newLog,
});