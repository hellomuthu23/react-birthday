import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Item, Input, Form, DatePicker, Button, Text } from 'native-base';

interface AddBirthdayState {
  chosenDate: Date;
}
class AddBirthday extends Component<{}, AddBirthdayState> {
  constructor(props: any) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate: any) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
      <Form>
        <Item>
          <Input placeholder='Name' />
          {/* <Icon name='ios-checkmark-circle' /> */}
        </Item>
        <Item>
          <DatePicker
            defaultDate={new Date(2000, 1, 1)}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'spinner'}
            placeHolderText='Select date'
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            onDateChange={this.setDate}
            disabled={false}
          />
        </Item>
        <Button block style={styles.save}>
          <Text>Save</Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  save: {
    marginBottom: 20,
  },
});
export default AddBirthday;
