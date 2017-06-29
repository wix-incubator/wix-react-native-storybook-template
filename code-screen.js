import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {getStorybookUI} from '@storybook/react-native';
export default class CodeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: '',
    };
  }

  setStorage(code) {
    return AsyncStorage.setItem('@codeScreen:code', code).catch(console.log);
  }

  getStorage() {
    return AsyncStorage.getItem('@codeScreen:code')
      .catch(console.error);
  }

  componentWillMount() {
    this.getStorage()
      .then(code => code && this.setState({code}));
  }

  onPressReset() {
    this.setStorage('');
    this.setState({ code: ''});
  }

  startStorybook(code) {
    const StorybookUI = getStorybookUI({port: 7007, host: 'localhost', query: 'pairedId=' + code, manualId: true, resetStorybook: true});

    Navigation.registerComponent('UI-LIB', () => StorybookUI);

    this.props.navigator.push({
      screen: 'UI-LIB'
    });
  }

  onPressStart() {
    this.setStorage(this.state.code);
    this.startStorybook(this.state.code);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 200, paddingLeft: 10, paddingRight: 10}}>
        <Text>
          Insert code displayed in browser
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(code) => this.setState({code})}
          value={this.state.code}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus
        />
        <View style={{flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'stretch', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{marginRight: 20}} onPress={() => this.onPressReset()}>
            <Text style={{fontSize: 20}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressStart()}>
            <Text style={{fontSize: 20}}>Start</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
