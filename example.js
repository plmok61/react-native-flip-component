import React, { Component } from 'react';
import FlipComponent from 'react-native-flip-component';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MapView } from 'expo';

const { height, width } = Dimensions.get('window');

function FrontView(props) {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: '#fcfaf9',
          fontSize: 20,
        }}
      >
        There is a map on the other side
      </Text>
      <TouchableOpacity
        onPress={props.flip}
        style={styles.button}
      >
        <Text style={styles.text}>Flip it over</Text>
      </TouchableOpacity>
    </View>
  );
}

function BackView(props) {
  return (
    <View>
      <MapView
        style={{ height: height / 2, width }}
      />
      <TouchableOpacity
        onPress={props.flip}
        style={styles.button}
      >
        <Text style={styles.text}>Flip it back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
    this.flip = this.flip.bind(this);
  }

  flip() {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlipComponent
          isFlipped={this.state.isFlipped}
          frontView={
            <FrontView flip={this.flip} />
          }
          backView={
            <BackView flip={this.flip} />
          }
          frontStyles={styles.frontStyles}
          backStyles={styles.backStyles}
          rotateDuration={1000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontStyles: {
    backgroundColor: '#59687d',
    justifyContent: 'center',
    height,
    width,
  },
  backStyles: {
    backgroundColor: '#8993a2',
    justifyContent: 'center',
    height,
    width,
  },
  button: {
    backgroundColor: '#152c43',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 75,
    alignSelf: 'center',
  },
  text: {
    color: '#bddac8',
  },
});
