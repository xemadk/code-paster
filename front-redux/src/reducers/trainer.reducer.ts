import {BaseAction} from './baseAction';
import {actionIds} from '../common'

export interface TrainerState {
    room: string;
    log: string;
};

const defaultTrainer = (): TrainerState => ({
    room: "",
    log: "",
});


export const trainerReducer = (state:TrainerState = defaultTrainer(),action: BaseAction)=>{
    switch (action.type){
        case actionIds.TRAINER_WRITE:
            return handleAppendLog(state,action.payload);
    };

    return state;
}

const handleAppendLog = (state:TrainerState, newLog:string):TrainerState=> ({
    ...state,
    log: state.log+"\n"+newLog,
});