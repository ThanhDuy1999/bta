import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import Slider from "../component/Slider";

const { width } = Dimensions.get('window')
const height = width * 0.5

const Home = () => {
    return (
        <Slider />
    );
}
export default Home;