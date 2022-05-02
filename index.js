import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Easing, ViewPropTypes, Platform } from 'react-native';

class FlipComponent extends Component {
  static propTypes = {
    isFlipped: PropTypes.bool.isRequired,
    frontView: PropTypes.element.isRequired,
    backView: PropTypes.element.isRequired,
    scale: PropTypes.number,
    frontPerspective: PropTypes.number,
    backPerspective: PropTypes.number,
    scaleDuration: PropTypes.number,
    rotateDuration: PropTypes.number,
    containerStyles: ViewPropTypes.style,
    frontStyles: ViewPropTypes.style,
    backStyles: ViewPropTypes.style,
  };

  static defaultProps = {
    scale: 0.8,
    frontPerspective: 1000,
    backPerspective: 1000,
    scaleDuration: 100,
    rotateDuration: 300,
    containerStyles: null,
    frontStyles: null,
    backStyles: null,
  };

  constructor(props) {
    super(props);
    this.flip = this.flip.bind(this);
    this.animatedScale = new Animated.Value(0);
    this.animatedView = new Animated.Value(0);
    this.frontInterpolate = this.animatedView.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedView.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });
    this.scaleInterpolate = this.animatedScale.interpolate({
      inputRange: [0, 1],
      outputRange: [1, props.scale],
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFlipped !== this.props.isFlipped) {
      this.flip();
    }
  }

  flip() {
    const toValue = this.props.isFlipped ? 1 : 0;

    Animated.sequence([
      Animated.timing(
        this.animatedScale,
        {
          toValue: 1,
          duration: this.props.scaleDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.animatedView,
        {
          toValue,
          duration: this.props.rotateDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.animatedScale,
        {
          toValue: 0,
          duration: this.props.scaleDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
    ]).start();
  }

  render() {
    const frontAnimatedStyle = { rotateY: this.frontInterpolate };
    const backAnimatedStyle = { rotateY: this.backInterpolate };
    const scaleAnimatedStyle = { scale: this.scaleInterpolate };
    return (
        <View style={this.props.containerStyles}>
          <Animated.View
            style={[
              {
                backfaceVisibility: 'hidden',
                transform: [
                  { perspective: this.props.frontPerspective },
                  frontAnimatedStyle,
                  scaleAnimatedStyle,
                ],
              },
              // Fix backfaceVisibility on Android
              // https://github.com/facebook/react-native/issues/9718
              Platform.select({
                android: {
                  opacity: this.animatedView.interpolate({ inputRange: [0, 0.5, 0.5], outputRange: [1, 1, 0] }),
                },
              }),
              this.props.frontStyles,
            ]}
            pointerEvents={this.props.isFlipped ? 'none' : 'auto'}
          >
            {this.props.frontView}
          </Animated.View>
          <Animated.View
            style={[
              {
                backfaceVisibility: 'hidden',
                position: 'absolute',
                transform: [
                  { perspective: this.props.backPerspective },
                  backAnimatedStyle,
                  scaleAnimatedStyle,
                ],
              },
              // Fix backfaceVisibility on Android
              // https://github.com/facebook/react-native/issues/9718
              Platform.select({
                android: {
                  opacity: this.animatedView.interpolate({ inputRange: [0.5, 0.5, 1], outputRange: [0, 1, 1] }),
                },
              }),
              this.props.backStyles,
            ]}
            pointerEvents={this.props.isFlipped ? 'auto' : 'none'}
          >
            {this.props.backView}
          </Animated.View>
        </View>
    );
  }
}

export default FlipComponent;
