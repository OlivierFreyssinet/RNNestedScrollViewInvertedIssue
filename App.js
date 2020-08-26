/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  Text,
  Switch,
} from 'react-native';

/* eslint-disable */

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const TestItem = ({text}) => {
  const height = Dimensions.get('window').height / 7
  return (
    <View style={{height, width: '100%', marginBottom: 10, backgroundColor: 'lightblue'}}>
      <Text style={{fontSize: 20}}>{text}</Text>
    </View>
  );
};

const NestedScrollView = () => {
  const height = Dimensions.get('window').height / 2
  return (
    <View style={{height, backgroundColor: 'lightcoral', marginBottom: 10}}>
      <Text style={{fontSize: 20}}>Nested scrollview:  (try to overscroll to see the issue)</Text>
      <ScrollView nestedScrollEnabled style={{margin: 10}}>
        {'abcdef'.split('').map((t) => (
          <TestItem key={t} text={t} />
        ))}
      </ScrollView>
    </View>
  )
}

class App extends React.Component {
  state = {
    inverted: false,
  }
  render() {
    const {inverted} = this.state
    const length = 9
    const preText = "What's shown here illustrates a bug that happens when rendering a nested ScrollView inside an INVERTED FlatList.\n"
    const text = inverted
      ? 'Flatlist inverted: When the nested ScrollView is scrolled past its edges (overscroll), the FlatList scrolls in the wrong direction'
      : 'FlatList not inverted: When the nested ScrollView is scrolled past its edges (overscroll), the FlatList scrolls in the wrong direction'
    const items = [... Array(length).keys()]
    return (
      <View
        style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
        <View style={{backgroundColor: 'lightgreen', padding: 10}}>
          <Text>{preText}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Text>flatlist inverted: </Text>
            <Switch value={inverted} onValueChange={inverted => this.setState({inverted})} />
            <Text style={{color: inverted ? 'red' : 'black'}}>{inverted ? 'BUGGY' : 'BEHAVES AS EXPECTED'}</Text>
          </View>
          <Text>{text}</Text>
        </View>
        <Text style={{color:'white'}}>
          FlatList:
        </Text>
        <FlatList
          style={{margin: 20}}
          inverted={inverted}
          data={items}
          keyExtractor={(item, index) => index + ''}
          renderItem={({item, index}) => {
            if (index === Math.floor(items.length / 2)) return <NestedScrollView />
            return <TestItem text={item} />
          }} />
      </View>
    );
  }
}


export default App;
