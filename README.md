# react-native-flip-component

### Installation
`npm install react-native-flip-component --save`

### Instructions
Pass a boolean, front component, and back component as props. The boolean will determine if the front or back component should be displayed.

### Demo
GIF coming soon...

### Props
Name | Required? | Description
---- | ----------|--------
isFlipped | true | boolean
frontView | true | Component
backView | true | Component
scale | false | defaults to 0.8
scaleDuration | false | defaults to 100
frontPerspective | false | defaults to 1000
backPerspective | false | defaults to 1000
rotateDuration | false | defaults to 300
containerStyles | false | defaults to { flex: 1 }
frontStyles | false | defaults to null
backStyles | false | defaults to null

### Example
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
