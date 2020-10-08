import * as ioClient from 'socket.io-client';
import { all, fork, take, call, put, cancel } from 'redux-saga/effects';
import { actionIds } from '../common';
import {channel, eventChannel} from 'redux-saga';
import { createSocket } from '../core/api';
import { SocketEmitMessageTypes, SocketOuputMessageLiteral, SocketReceiveMessageTypes } from '../core/const';
import { studentAppendLogAction } from '../actions';
import { BaseAction } from 'reducers/baseAction';


const connect = (roomId:string) => () => {
    const socket = createSocket({
        room:roomId,
        trainertoken: '',
      });
  
    return new Promise((resolve, reject) => {
      socket.on("connect", () => {
        resolve({ socket });
      });
  
      socket.on("connect_error", (err) => {
        console.log("connection failed :-(");
        reject(new Error("ws:connected-failed"));
      });
    }).catch((error) => ({ socket, error }));
  };

  function* flowStudent(){
      while(true){
          const action:BaseAction = yield take(actionIds.STUDENT_START);
          let roomId = action.payload;
          const {socket,error} = yield call(connect(roomId));
          if(socket){
              console.log("student connection to socket succeeded");
              const ioTask= yield fork(handleIOReader,socket);
              yield take(actionIds.STUDENT_STOP);
              yield cancel(ioTask);
              socket.disconnect();
          }else{
              console.log("error connecting")
          }
      }
  }

  function* flowTrainer(){
    while(true){
      const action:BaseAction = yield take(actionIds.TRAINER_START);
      let roomId = action.payload;
      const {socket,error} = yield call(connect(roomId));
      if(socket){
          console.log("trainer connection to socket succeeded");
          const ioTask= yield fork(handleIOWriter,socket);
          yield take(actionIds.TRAINER_STOP);
          yield cancel(ioTask);
          socket.disconnect();
      }else{
          console.log("error connecting")
      }
    }
  }

  function subscribe(socket){
    return eventChannel(emit=>{
      socket.on(SocketOuputMessageLiteral.MESSAGE,msg=>{
        console.log(msg);

        if (msg.type) {
            const { type, payload } = msg;
    
            switch (type) {
              case SocketReceiveMessageTypes.APPEND_TEXT:
                emit(studentAppendLogAction(msg.payload));
                break;
            }
          }
      });

      socket.on('disconnect',e=>{
        //TODO
      });

      socket.on('error',error=>{
        //TODO
      });

      return ()=>{};
    });
  }

  function publish(socket,newLog:string){
    socket.emit(SocketOuputMessageLiteral.MESSAGE, {
      type: SocketEmitMessageTypes.TRAINER_APPEND_TEXT,
      payload: newLog,
    });
  }

  function* read(socket){
    const channel = yield call(subscribe,socket);
    while(true){
      let action = yield take(channel);
      yield put(action);
    }
  }

  function* handleIOReader(socket) {
    yield fork(read, socket);
  }

  function* writer(socket) {
    while(true){
      console.log("handleIOWriter")
      const action:BaseAction = yield take(actionIds.TRAINER_WRITE);
      publish(socket,action.payload);
    }
  }

  function* handleIOWriter(socket){
    yield fork(writer, socket);
  }

  export function* socketRootSaga(){
      yield all([fork(flowTrainer),fork(flowStudent)]);
  }