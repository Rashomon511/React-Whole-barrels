import {routerRedux} from 'dva/router';
export default {
    namespace: 'login',
    state: {
    },
    effects: {
      * goHome({payload},{put}){
        const {username, password} = payload;
        if(username === 'admin' && password === '123'){
          yield put(routerRedux.push(`home`));
        }
      }
    },
    reducers: {
    },
  };