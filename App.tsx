import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Birthdays } from './components/birthdays';
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Birthday Reminder</Text> */}

    // </View>
    <Birthdays />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
