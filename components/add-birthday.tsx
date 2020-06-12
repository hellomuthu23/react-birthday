import React, { Component, Fragment } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Item, Input, Button, Text, DatePicker } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addBirthday } from '../state/birthdays.actions';
import { Birthday } from '../models/birthday.model';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TouchableOpacity } from 'react-native';

interface Props {
  addBirthday: (birthday: Birthday) => void;
  navigation: { navigate: (screen: string) => void };
}
interface AddBirthdayState {
  chosenDate: Date;
}
class AddBirthday extends Component<Props, AddBirthdayState> {
  date = new Date(2000, 1, 1);
  dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  formattedDate = this.date.toLocaleString(undefined, this.dateDisplayOptions);
  constructor(props: any) {
    super(props);
  }

  handleSave(value: Birthday) {
    this.props.addBirthday(value);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Formik
        initialValues={{ name: '', date: this.date }}
        onSubmit={(values) => this.handleSave(values)}
        validationSchema={yup.object().shape({
          name: yup.string().required(),
          date: yup.date().required(),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue }) => (
          <Fragment>
            <Item>
              <Input
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                placeholder='Name'
              />
              {touched.name && errors.name && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>}
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
                onDateChange={(date) => setFieldValue('date', date)}
                disabled={false}
              />
              {touched.date && errors.date && <Text style={{ fontSize: 10, color: 'red' }}>{errors.date}</Text>}
            </Item>
            <Button block disabled={!isValid} onPress={handleSubmit}>
              <Text>Save</Text>
            </Button>
          </Fragment>
        )}
      </Formik>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    birthdays: state.birthdays,
  };
}
function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({ addBirthday: addBirthday }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(AddBirthday);
