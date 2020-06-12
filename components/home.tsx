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

interface Props {
  navigation: { navigate: (screen: string) => void };
}
class Home extends Component<Props, {}> {
  render() {
    return (
      <Container>
        <Header>
          {/* <Left /> */}
          <Body>
            <Title>Upcoming Birthdays....</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        <Content
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
            paddingHorizontal: 10,
          }}
        >
          <Card></Card>
          <Button
            dark
            block
            onPress={() => {
              this.props.navigation.navigate('Birthdays');
            }}
            style={{ marginTop: 40 }}
          >
            <Text>View All Birthdays</Text>
          </Button>
        </Content>
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
