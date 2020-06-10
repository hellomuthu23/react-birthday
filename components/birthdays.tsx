import React, { Component } from 'react';
import { StyleSheet, ListView, Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  Fab,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBirthday } from '../state/birthdays.actions';
import { Birthday } from '../models/birthday.model';

const pic = require('../assets/picts/avatar.jpg');

interface Props {
  birthdays: {
    birthdays: Birthday[];
    loading: boolean;
  };
}
interface BirthdaysState {
  chosenDate: Date;
}

interface BirthdayView {
  name: string;
  date: string;
}
class Birthdays extends Component<Props, BirthdaysState> {
  birthdays: BirthdayView[] = [];

  constructor(props: any) {
    super(props);
    const dateDisplayOptions: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    this.birthdays.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    this.birthdays = this.props.birthdays.birthdays.map((v) => {
      const formattedDate = this.getDisplayDate(v.date);

      const birthdayView = { name: v.name, date: formattedDate };
      return birthdayView;
    });
  }

  private getDisplayDate(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} `;
    console.log(formattedDate);
    return formattedDate;
  }

  render() {
    return (
      <List>
        {this.birthdays.map((data, i) => (
          <ListItem key={i} avatar>
            <Left>
              <Thumbnail small source={pic} />
            </Left>
            <Body>
              <Text>{data.name}</Text>
            </Body>
            <Right>
              <Text note>{data.date}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
  },
});

function mapStateToProps(state: any) {
  return {
    birthdays: state.birthdays,
  };
}
function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({ addBirthday: addBirthday }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Birthdays);
