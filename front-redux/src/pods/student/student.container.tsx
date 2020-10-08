import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { StudentComponent } from './student.component';
import { studentStartAction, studentStopAction } from '../../actions';
import {BaseState} from '../../reducers';

interface Params {
  room: string;
}

export const PlayerContainer = () => {
  const dispatch = useDispatch();

  const { room } = useParams<Params>();
  const log = useSelector((s:BaseState)=>s.studentReducer.log);


  React.useEffect(() => {
    dispatch(studentStartAction(room));
    return ()=>dispatch(studentStopAction());
  }, []);

  return (
    <>
      <StudentComponent room={room} log={log} />
    </>
  );
};
