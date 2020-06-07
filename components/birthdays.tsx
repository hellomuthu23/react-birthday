import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
} from 'native-base';

const pic = require('../assets/picts/avatar.jpg');

const datas = [
  {
    img: pic,
    text: 'Kumar Pratik',
    note: 'Its time to build a difference . .',
    time: '3:43 pm',
  },
  {
    img: pic,
    text: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
    time: '1:12 pm',
  },
  {
    img: pic,
    text: 'Megha',
    note: 'Live a life style that matchs your vision',
    time: '10:03 am',
  },
  {
    img: pic,
    text: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
    time: '5:47 am',
  },
  {
    img: pic,
    text: 'Saurabh Sahu',
    note: 'The biggest risk is a missed opportunity !!',
    time: '11:11 pm',
  },
  {
    img: pic,
    text: 'Varun Sahu',
    note: 'Wish I had a Time machine . .',
    time: '8:54 pm',
  },
  {
    img: pic,
    text: 'Kumar Pratik',
    note: 'Its time to build a difference . .',
    time: '3:43 pm',
  },
  {
    img: pic,
    text: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
    time: '1:12 pm',
  },
  {
    img: pic,
    text: 'Megha',
    note: 'Live a life style that matchs your vision',
    time: '10:03 am',
  },
  {
    img: pic,
    text: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
    time: '5:47 am',
  },
  {
    img: pic,
    text: 'Saurabh Sahu',
    note: 'The biggest risk is a missed opportunity !!',
    time: '11:11 pm',
  },
  {
    img: pic,
    text: 'Varun Sahu',
    note: 'Wish I had a Time machine . .',
    time: '8:54 pm',
  },
];

export class Birthdays extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button> */}
          </Left>
          <Body>
            <Title style={styles.title}>Upcoming Birthdays</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {datas.map((data, i) => (
              <ListItem avatar>
                <Left>
                  <Thumbnail small source={data.img} />
                </Left>
                <Body>
                  <Text>{data.text}</Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
                <Right>
                  <Text note>{data.time}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  title: {
    width: '100%',
  },
});

export default Birthdays;
