import React from 'react';
import { Image } from 'react-native';
import AddBirthday from './components/add-birthday';
import Birthdays from './components/birthdays';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './state/birthdays.reducers';
import { View, Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

interface AppState {
  loading: boolean;
}
const store = createStore(reducers);
const Stack = createStackNavigator();

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
    setTimeout(() => this.setState({ loading: false }), 5000);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <Image style={{ width: '100%', height: '100%' }} source={require('./assets/splash/splash.png')} />
        </View>
      );
    }

    return (
      <Root>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='Birthdays'
                component={Birthdays}
                options={{
                  title: 'Birthday Reminder',
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                }}
              />
              <Stack.Screen name='AddBirthday' component={AddBirthday} options={{ title: 'Add Birthday' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </Root>
    );
  }
}
