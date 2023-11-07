import {combineReducers} from 'redux';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import tagReducer from './tagSlice';
import ophalingeReducer from './OphalingeSlice';
import loadingReducer from './loadingSlice';

const reducers = combineReducers({
  auth: authReducer,
  project: projectReducer,
  tag: tagReducer,
  ophalinge: ophalingeReducer,
  loading: loadingReducer,
});

export const rootReducer = (state, action) => reducers(state, action);
