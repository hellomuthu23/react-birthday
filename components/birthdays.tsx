import React, { Component } from 'react';
import { StyleSheet, ListView, Alert, ScrollView } from 'react-native';
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
import { NavigationEvents } from 'react-navigation';
import { Notifications } from 'react-native-notifications';
const pic = require('../assets/picts/avatar.jpg');

interface Props {
  birthdays: {
    birthdays: Birthday[];
    loading: boolean;
  };
  navigation: { navigate: (screen: string) => void; addListener: any };
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
    this.loadBirthDays();
  }

  notify() {
    Notifications.postLocalNotification(
      {
        payload: 'ddd',
        badge: 2,
        body: 'dsfsdfsd',
        identifier: '2',
        sound: 'd',
        title: 'muthu',
        type: 'sd',
        thread: 'd',
      },
      2
    );
  }

  componentDidMount() {
    console.log('hhhh');
    this.props.navigation.addListener('focus', () => {
      console.log('dd');
      this.loadBirthDays();
      this.forceUpdate();
    });
  }
  loadBirthDays() {
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
      <Container>
        <ScrollView>
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
        </ScrollView>
        <Fab
          position='bottomRight'
          onPress={() => {
            this.props.navigation.navigate('AddBirthday');
          }}
        >
          <Icon name='md-add'></Icon>
        </Fab>
      </Container>
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
