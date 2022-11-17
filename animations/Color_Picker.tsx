import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { RNSVGRect } from 'react-native-svg';
import {Foundation as Icon } from "@expo/vector-icons";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const AnimatedIcon = Animated.createAnimatedComponent(Icon)
 
class ColorPiker extends React.Component{
    state = { 
        animation: new Animated.Value(0),
        button_animation: new Animated.Value(0),
        color: '#000'
    }

    handleToggle = () => {
      const toValue = this._open ? 0 : 1;
      Animated.spring(this.state.animation, {
        toValue,
        useNativeDriver: false
      }).start()
    };
    _open: boolean = false;
    _input: TextInput | Animated.LegacyRef<TextInput>;
    toggleInput: (event: GestureResponderEvent) => void;
    

    render() { 
        const colorStyle = {
            backgroundColor: this.state.color
        }
        return (  
            <View style={styles.container}>
            <Animated.View style={[rowStyle, styles.rowWrap]}>
              <TouchableWithoutFeedback onPress={this.toggleInput}>
                <Animated.View style={[styles.colorBall, colorStyle]} />
              </TouchableWithoutFeedback>
    
              <View style={styles.row}>
                <TouchableOpacity>
                  <AnimatedIcon name="bold" size={30} color="#555" style={iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AnimatedIcon name="italic" size={30} color="#555" style={iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AnimatedIcon name="align-center" size={30} color="#555" style={iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AnimatedIcon name="link" size={30} color="#555" style={iconStyle} />
                </TouchableOpacity>
    
                <Animated.View
                  style={[StyleSheet.absoluteFill, styles.colorRowWrap, colorRowStyles]}
                  pointerEvents={this.state.inputOpen ? "auto" : "none"}
                >
                  <AnimatedTextInput
                    value={this.state.color}
                    style={[styles.input, inputStyle]}
                    onChangeText={color => this.setState({ color })}
                    ref={input => (this._input = input)}
                  />
                  <TouchableWithoutFeedback onPress={this.toggleInput}>
                    <Animated.View style={[styles.okayButton, buttonStyle]}>
                      <Text style={styles.okayText}>OK</Text>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              </View>
            </Animated.View>
    
            <TouchableOpacity onPress={this.handleToggle} style={styles.button}>
              <Text>Toggle Open/Closed</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    rowWrap: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "50%",
      backgroundColor: "#FFF",
      borderRadius: 20,
      shadowColor: "#333",
      shadowOpacity: 0.2,
      shadowOffset: { width: 2, height: 2 },
      shadowRadius: 3,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    row: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      overflow: "hidden",
    },
  
    colorRowWrap: {
      flexDirection: "row",
      flex: 1,
      paddingLeft: 5,
    },
    input: {
      flex: 5,
    },
    okayButton: {
      borderRadius: 15,
      flex: 1,
      backgroundColor: "#309EEB",
      alignItems: "center",
      justifyContent: "center",
    },
    okayText: {
      color: "#FFF",
    },
    colorBall: {
      width: 15,
      height: 15,
      borderRadius: 8,
    },
    button: {
      marginTop: 50,
    },
  });



export default ColorPiker;
