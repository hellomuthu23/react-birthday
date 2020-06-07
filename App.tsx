import React from 'react';
import { Birthdays } from './components/birthdays';
import AddBirthday from './components/add-birthday';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/home';

// export default function App() {
//   return (
//     <Router>
//       <Scene key='root'>
//         <Scene key='Home' component={Home} initial={true} />
//         <Scene key='Birthdays' component={Birthdays} title='Birthdays' />
//         <Scene key='AddBirthday' component={AddBirthday} title='Add Birthday' />
//       </Scene>
//     </Router>
//   );
// }
interface AppState {
  loading: boolean;
}
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
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }

    return (
      <Router>
        <Scene key='root'>
          <Scene key='Home' component={Home} initial={true} />
          <Scene key='Birthdays' component={Birthdays} title='Birthdays' />
          <Scene key='AddBirthday' component={AddBirthday} title='Add Birthday' />
        </Scene>
      </Router>
    );
  }
}
