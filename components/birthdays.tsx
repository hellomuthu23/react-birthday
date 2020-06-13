import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Container, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Fab } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBirthday } from '../state/birthdays.actions';
import { Birthday } from '../models/birthday.model';
import { Notifications } from 'expo';
// eslint-disable-next-line
import UserAvatar from 'react-native-user-avatar';

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

  constructor(props: any) {
    super(props);
    this.loadBirthDays();
  }

  notify() {
    Notifications.presentLocalNotificationAsync({
      body: 'Muhussd',
      title: 'Birthday Reminder',
      // android: { icon: favicon },
      // data: "It's Muthu's Birthday, wish him",
    });
  }

  componentDidMount() {
    console.log('hhhh');
    this.props.navigation.addListener('focus', () => {
      console.log('dd');
      this.loadBirthDays();
      this.forceUpdate();
    });
    this.notify();
  }
  loadBirthDays() {
    this.birthdays = this.props.birthdays.birthdays.map((v) => {
      const formattedDate = this.getDisplayDate(v.date);

      const birthdayView = { name: v.name, date: formattedDate };
      return birthdayView;
    });
    this.birthdays.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
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
    console.log(formattedDate);
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
