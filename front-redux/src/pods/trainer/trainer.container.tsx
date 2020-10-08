import * as React from 'react';
import { useParams } from 'react-router';
import { baseApiUrl } from 'core/const';
import { routes } from 'core/router/routes';
import { TrainerComponent } from './trainer.component';
import { useDispatch, useSelector } from 'react-redux';
import { trainerStartAction, trainerStopAction, trainerWriteAction } from '../../actions';
import { BaseState } from 'reducers';

interface Params {
  token: string;
  room: string;
}

export const TrainerContainer = () => {
  const dispatch = useDispatch();
  const [currentTrainerUrl, setCurrentTrainerUrl] = React.useState<string>('');
  const [currentStudentUrl, setCurrentStudentUrl] = React.useState<string>('');

  const { token, room } = useParams<Params>();
  const log = useSelector((s:BaseState)=>s.studentReducer.log);

  React.useEffect(() => {
    dispatch(trainerStartAction(room));

    setCurrentTrainerUrl(`${baseApiUrl}/#${routes.trainer(room, token)}`);
    setCurrentStudentUrl(`${baseApiUrl}/#${routes.student(room)}`);

    return ()=>dispatch(trainerStopAction());
  }, []);

  return (
    <TrainerComponent
      handleAppendTrainerText={(newLog)=>dispatch(trainerWriteAction(newLog))}
      currentTrainerUrl={currentTrainerUrl}
      currentStudentUrl={currentStudentUrl}
      log={log}
    />
  );
};
