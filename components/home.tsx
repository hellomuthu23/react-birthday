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

import Birthdays from './birthdays';
interface Props {
  navigation: { navigate: (screen: string) => void };
}
class Home extends Component<Props, {}> {
  render() {
    return (
      <Container>
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

export default Home;
