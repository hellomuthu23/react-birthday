import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Card,
  CardItem,
  Fab,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Birthday Remainder App</Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
            paddingHorizontal: 10,
          }}
        >
          <Card>
            <CardItem>
              <Text>Birthday Reminders</Text>
            </CardItem>
            <CardItem>
              <Text>View Upcoming Birthdays</Text>
            </CardItem>
          </Card>
          <Button
            dark
            block
            onPress={() => {
              Actions.Birthdays();
            }}
            style={{ marginTop: 40 }}
          >
            <Text>View Birthdays</Text>
          </Button>
        </Content>
        <Fab
          position='bottomRight'
          onPress={() => {
            Actions.AddBirthday();
          }}
        >
          <Icon name='md-add'></Icon>
        </Fab>
      </Container>
    );
  }
}

export default Home;
