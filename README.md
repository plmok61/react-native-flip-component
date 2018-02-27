# react-native-flip-component

```javascript
import React, { Component } from 'react';
import FlipComponent from 'react-native-flip-component';
import { View, Button, Text } from 'react-native';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false;
    };
  }
  render() {
    <View>
      <FlipComponent
        isFlipped={this.state.isFlipped}
        frontView={
          <View>
            <Text style={{ textAlign: 'center' }}>Front Side</Text>
          </View>
        }
        backView={
          <View>
            <Text style={{ textAlign: 'center' }}>Back Side</Text>
          </View>
        }
      />
      <Button
        onPress={() => this.setState({ isFlipped: !this.state.isFlipped })}
        title="Flip"
      />
    </View>
  }
}

```
