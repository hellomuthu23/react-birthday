import { Birthday } from '../models/birthday.model';
import AsyncStorage from '@react-native-community/async-storage';

export class BirthdayService {
  static async addBirthday(birthday: Birthday) {
    let birthdaysRaw = await AsyncStorage.getItem('@birthdays');
    let birthdays = [];
    if (birthdaysRaw) {
      birthdays = JSON.parse(birthdaysRaw);
    }
    birthdays.push(birthday);
    const jsonValue = JSON.stringify(birthdays);
    await AsyncStorage.setItem('@birthdays', jsonValue);
    console.log('Birthday Added');
    return birthdays;
  }
}
