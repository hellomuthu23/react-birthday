import { combineReducers } from 'redux';
import { Birthday } from '../models/birthday.model';
import { ADD_BIRTHDAY, DATA_LOADING, ADD_BIRTHDAY_SUCCESS } from './birthdays.actions';

interface InitialState {
  birthdays: Birthday[];
  loading: boolean;
}
const INITIAL_STATE: InitialState = {
  birthdays: [{ name: 'Muthu', date: new Date() }],
  loading: false,
};

const birthdayReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ADD_BIRTHDAY:
      return {
        ...state,
        birthdays: [...state.birthdays, action.payload],
      };
    case ADD_BIRTHDAY_SUCCESS:
      return {
        ...state,
        birthdays: action.payload,
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  birthdays: birthdayReducer,
});
