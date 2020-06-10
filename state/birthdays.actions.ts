import { Birthday } from '../models/birthday.model';
import { Dispatch } from 'redux';
import { BirthdayService } from '../services/birthday.service';

export const ADD_BIRTHDAY = 'ADD_BIRTHDAY';
export const ADD_BIRTHDAY_SUCCESS = 'ADD_BIRTHDAY_SUCCESS';
export const DATA_LOADING = 'DATA_LOADING';

export function addBirthDayData(birthday: Birthday) {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    BirthdayService.addBirthday(birthday)
      .then((res: any) => {
        dispatch(res);
        dispatch(loading(false));
      })
      .catch((err) => {
        dispatch(loading(false));
      });
  };
}

export const addBirthday = (birthday: Birthday) => ({
  type: ADD_BIRTHDAY,
  payload: birthday,
});

const birthdayAdded = (data: Birthday[]) => ({
  type: ADD_BIRTHDAY_SUCCESS,
  payload: data,
});

export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader,
});
