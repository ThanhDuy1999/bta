import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { imagesSlider } from "../data/SliderData";

const { width } = Dimensions.get('window')
const height = width * 0.5
// const imagesSlider = [
//     {
//         id: 1,
//         url: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
//     },
//     {
//         id: 2,
//         url: `http://image.tmdb.org/t/p/w780${movies[1]?.backdrop_path}`,
//     },
//     {
//         id: 3,
//         `http://image.tmdb.org/t/p/w780${movies[2]?.backdrop_path}`,
//     },
//     {
//         id: 4,
//         `http://image.tmdb.org/t/p/w780${movies[3]?.backdrop_path}`,
//     },
//     {
//         id: 5,
//         `http://image.tmdb.org/t/p/w780${movies[4]?.backdrop_path}`,
//     }]

class Slider extends Component {
    state = {
        active: 0
    }

    change = ({ nativeEvent }) => {
        const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.slideContainer}>
                    <Text style={styles.title}>SHOWING</Text>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        onScroll={this.change}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}>
                        {imagesSlider.map((image, index) =>
                            <Image
                                source={{ uri: image.url }}
                                style={styles.imageSlider}
                                key={index} />)
                        }
                    </ScrollView>
                    <View style={styles.dotContainer}>
                        {imagesSlider.map((id, index) =>
                            <Text key={index} style={index == this.state.active ? styles.dotActive : styles.dot}>⬤</Text>
                        )
                        }
                    </View>
                </View>
            </View>
        );
    }
}
export default Slider;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    slideContainer: {
        marginTop: 30,
        width,
        height,
        alignItems: 'center',
    },
    title: {
        marginTop: -20,
        fontSize: 22,
        fontWeight: 'bold',
    },
    imageSlider: {
        width,
        height,
        resizeMode: 'stretch',
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        margin: 3,
        fontSize: (width / 30),
    },
    dotActive: {
        color: '#fff',
        margin: 3,
        fontSize: (width / 30),
    },
    scroll: {
        width,
        height,
    }
})