import { StatusBar } from "expo-status-bar";
import React, {Component, useState} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import Svg, { Path } from "react-native-svg";
import SVGPath from "art/modes/svg/path";
import { Tween } from "art/morph/path";

import PhotoGrind from "./animations/Photo_Grind";

const end_path = "M2 14L9 20L22 4";
const start_path =
  "M15.7048,4.28868 C15.312,3.9005 14.6788,3.90428 14.2906,4.29713 C13.9025,4.68998 13.9062,5.32313 14.2991,5.71132 L21.6753,13.0000008 L4,13.0000008 C3.44772,13.0000008 3,13.4477 3,14.0000008 C3,14.5523 3.44772,15.0000008 4,15.0000008 L21.673,15.0000008 L14.2991,22.2864 C13.9062,22.6746 13.9025,23.3078 14.2906,23.7006 C14.6788,24.0935 15.312,24.0972 15.7048,23.7091 L24.6318,14.888 C25.127,14.3987 25.127,13.5991 24.6318,13.1097 L15.7048,4.28868 Z";

  export default class App extends Component {

    state = {
      animation: new Animated.Value(0)
    }

    private _path: any;

    componentWillMount(): void {
      const pathInterpolate = Tween(start_path, end_path)
      const p = new SVGPath()
      this.state.animation.addListener(({ value }) => {
        pathInterpolate.tween(value);
        pathInterpolate.applyToPath(p);
   
        this._path.setNativeProps({
          d: p.toSVG()
        })
      });
    }
    
    handlePress = () => {
      Animated.sequence([
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.delay(1500),
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        }),
      ]).start();
    };

    render(): React.ReactNode {        
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Svg width={150} height={150}>
              <Path
                d={start_path}
                stroke="black"
                ref={path => (this._path = path)}
              />
            </Svg>
          </TouchableWithoutFeedback>
          <PhotoGrind />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
