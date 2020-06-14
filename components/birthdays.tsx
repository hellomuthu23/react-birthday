import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Container, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Fab } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBirthday } from '../state/birthdays.actions';
import { Birthday } from '../models/birthday.model';

// @ts-ignore
import UserAvatar from 'react-native-user-avatar';
import { NotificationService } from '../services/notification.service';

const pic = require('../assets/picts/avatar.jpg');
const favicon = require('../assets/picts/favicon.png');
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
  private _unsubscribe: any;

  constructor(props: any) {
    super(props);
    this.loadBirthDays();
  }

  notify() {
    const today = new Date();
    this.props.birthdays.birthdays.map((birthday) => {
      if (birthday.date.getDate() === today.getDate()) {
        NotificationService.notify(`Birthday Reminder`, `It's ${birthday.name} birthday today, remember to wish`);
      }
      if (birthday.date.getDate() === today.getDate() + 1) {
        NotificationService.notify(`Birthday Reminder`, `It's ${birthday.name} birthday tomorrow, remember to wish`);
      }
    });
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loadBirthDays();
      this.notify();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  loadBirthDays() {
    const sortedBirthdays = this.sortBirthday([...this.props.birthdays.birthdays]);
    // Map birthdays to view mode
    this.birthdays = sortedBirthdays.map((v) => {
      const formattedDate = this.getDisplayDate(v.date);

      const birthdayView = { name: v.name, date: formattedDate };
      return birthdayView;
    });
  }

  private sortBirthday(birthdays: Birthday[]) {
    // sort birthdays in asc order
    birthdays.sort((a, b) => +a.date - +b.date);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() - 1);

    birthdays = birthdays.map((val) => {
      val.date.setFullYear(dueDate.getFullYear());
      if (val.date < dueDate) {
        val.date.setFullYear(dueDate.getFullYear() + 1);
      }
      return val;
    });
    birthdays.sort((a: any, b: any) => a.date - b.date);
    return birthdays;
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

    const formattedDate = `${date.getDate()}/${months[date.getMonth()]} `;
    return formattedDate;
  }

  render() {
    return (
      <Container>
        {this.birthdays.length === 0 && (
          <Container style={styles.emptyContainer}>
            <Image source={favicon}></Image>
            <Text>Start adding birthdays</Text>
          </Container>
        )}
        <ScrollView>
          <List>
            {this.birthdays.map((data, i) => (
              <ListItem key={i} avatar>
                <Left>
                  <UserAvatar size={30} name={data.name} />
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
          style={{ backgroundColor: '#f4511e' }}
        >
          <Icon name='md-add'></Icon>
        </Fab>
        <Fab
          position='bottomLeft'
          onPress={() => {
            this.loadBirthDays();
          }}
          style={{ backgroundColor: '#f4511e' }}
        >
          <Icon name='md-refresh'></Icon>
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
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
