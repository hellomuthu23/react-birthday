import React from 'react';
import { Birthday } from './models/birthday.model';
import AddBirthday from './components/add-birthday';
import Birthdays from './components/birthdays';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './state/birthdays.reducers';

interface AppState {
  loading: boolean;
}
const store = createStore(reducers);
export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'>
            <Scene key='Home' component={Home} initial={true} />
            <Scene key='Birthdays' component={Birthdays} title='Birthdays' />
            <Scene key='AddBirthday' component={AddBirthday} title='Add Birthday' />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
