import {BaseAction} from './baseAction';
import {actionIds} from '../common'

export interface StudentState {
    room: string;
    log: string;
};

const defaultStudent = (): StudentState => ({
    room: "",
    log: "",
});


export const studentReducer = (state:StudentState = defaultStudent(),action: BaseAction)=>{
    switch (action.type){
        case actionIds.STUDENT_FIRST:
            return state;
        case actionIds.STUDENT_APPEND_LOG:
            return handleAppendLog(state,action.payload);
    };

    return state;
}

const handleAppendLog = (state:StudentState, newLog:string):StudentState=> ({
    ...state,
    log: state.log+"\n"+newLog,
});