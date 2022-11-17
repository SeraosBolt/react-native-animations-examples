import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export default class animations extends Component {
  state = {
    activeImage: null,
    activeIndex: null,
    animation: new Animated.Value(0),
    position: new Animated.ValueXY(),
    size: new Animated.ValueXY(),
  };
  _gridImages: {};
  _x: any;
  _y: any;
  _width: any;
  _height: any;
  _viewImage: any;
  _content: View | Animated.LegacyRef<View>;

  componentWillMount() {
    this._gridImages = {};
  }

  handleOpenImage = (index) => {
    this._gridImages[index].measure(
      (x, y, width, height, pageX, pageY: number) => {
        (this._x = pageX), (this._y = pageY);
        this._width = width;
        this._height = height;

        this.state.position.setValue({
          x: Number(pageX),
          y: Number(pageY),
        });

        this.state.size.setValue({
          x: width,
          y: height,
        });

        this.setState(
          {
            activeImage: images[index],
            activeIndex: index,
          },
          () => {
            this._viewImage.measure(
              (tX, tY, tWidth, tHeight, tPageX, tPageY) => {
                Animated.parallel([
                  Animated.spring(this.state.position.x, {
                    toValue: tPageX,
                    speed: 1,
                    useNativeDriver: false,
                  }),
                  Animated.spring(this.state.position.y, {
                    toValue: tPageY,
                    useNativeDriver: false,
                  }),
                  Animated.spring(this.state.size.x, {
                    toValue: tWidth,
                    useNativeDriver: false,
                  }),
                  Animated.spring(this.state.size.y, {
                    toValue: tHeight,
                    useNativeDriver: false,
                  }),
                  Animated.spring(this.state.animation, {
                    delay: 100,
                    toValue: 1,
                    useNativeDriver: false,
                  }),
                ]).start();
              }
            );
          }
        );
      }
    );
  };

  handleClose = () => {
    Animated.parallel([
      Animated.timing(this.state.position.x, {
        toValue: this._x,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.position.y, {
        toValue: this._y,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.size.x, {
        toValue: this._width,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.size.y, {
        toValue: this._height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.animation, {
        delay: 100,
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this.setState({
        activeImage: null,
      });
    });
  };

  render() {
    const animatedContentTranslate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    const animtedContentStyles = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: animatedContentTranslate,
        },
      ],
    };

    const animatedClose = {
      opacity: this.state.animation,
    };

    const activeImageStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    };

    const activeIndexStyle = {
      opacity: this.state.activeImage ? 0 : 1,
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            {images.map((src, index) => {
              const style =
                index === this.state.activeIndex ? activeIndexStyle : undefined;

              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => this.handleOpenImage(index)}
                >
                  <Animated.Image
                    source={src}
                    style={[styles.gridImage, style]}
                    resizeMode="cover"
                    ref={(image) => (this._gridImages[index] = image)}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View
            style={styles.topContent}
            ref={(image) => (this._viewImage = image)}
          >
            <Animated.Image
              key={this.state.activeImage}
              source={this.state.activeImage}
              resizeMode="cover"
              style={[styles.viewImage, activeImageStyle]}
            />
          </View>
          <Animated.View
            style={[styles.content, animtedContentStyles]}
            ref={(content) => (this._content = content)}
          >
            <Text style={styles.title}>Pretty Image from Unsplash</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              lobortis interdum porttitor. Nam lorem justo, aliquam id feugiat
              quis, malesuada sit amet massa. Sed fringilla lorem sit amet metus
              convallis, et vulputate mauris convallis. Donec venenatis
              tincidunt elit, sed molestie massa. Fusce scelerisque nulla vitae
              mollis lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel
              viverra tellus, et venenatis massa. Maecenas ac gravida purus, in
              porttitor nulla. Integer vitae dui tincidunt, blandit felis eu,
              fermentum lorem. Mauris condimentum, lorem id convallis fringilla,
              purus orci viverra metus, eget finibus neque turpis sed turpis.
            </Text>
          </Animated.View>
          <TouchableWithoutFeedback onPress={this.handleClose}>
            <Animated.View style={[styles.close, animatedClose]}>
              <Text style={styles.closeText}>X</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridImage: {
    width: "33%",
    height: 150,
  },
  viewImage: {
    width: 0,
    height: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },
  topContent: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    backgroundColor: "transparent",
    fontSize: 28,
    color: "#FFF",
  },
});

const images = [
  { uri: "http://i.imgur.com/ELeNsEk.jpg" },
  { uri: "http://i.imgur.com/nRzunT5.jpg" },
  { uri: "http://i.imgur.com/mLsfCaX.jpg" },
  { uri: "http://i.imgur.com/LWNij55.jpg" },
  { uri: "http://i.imgur.com/Qp3EbEL.jpg" },
  { uri: "http://i.imgur.com/fHspYxM.jpg" },
  { uri: "http://i.imgur.com/iJNUXyy.jpg" },
  { uri: "http://i.imgur.com/9Nq6ecH.jpg" },
  { uri: "http://i.imgur.com/dWjRmlv.jpg" },
  { uri: "http://i.imgur.com/wJ6GfX2.jpg" },
  { uri: "http://i.imgur.com/kyprcIX.jpg" },
  { uri: "http://i.imgur.com/B5gbx7T.jpg" },
  { uri: "http://i.imgur.com/aEwp6No.jpg" },
  { uri: "http://i.imgur.com/Ophf7gS.jpg" },
  { uri: "http://i.imgur.com/fbj7fPr.jpg" },
  { uri: "http://i.imgur.com/KP7sqd3.jpg" },
  { uri: "http://i.imgur.com/LBKLcn8.jpg" },
];
