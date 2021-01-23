import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window')

const cols = 2, rows = 2;

class MoviePoster extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        onOpen: PropTypes.func,
    }

    render() {
        const { movie, movie: { title, release_date }, onOpen } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => onOpen(movie)}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: `http://image.tmdb.org/t/p/w780${this.props.movie?.poster_path}` }} style={styles.image} />
                </View>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.release_date} numberOfLines={1}>{release_date}</Text>
            </TouchableOpacity>
        )
    }
}
export default MoviePoster;

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginBottom: 10,
        height: (height - 20 - 20) / rows - 10,
        width: (width - 10) / cols - 10,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        borderRadius: 10,
        ...StyleSheet.absoluteFillObject, //fill space in a container
    },
    title: {
        alignSelf: 'center',
        fontSize: 14,
        marginTop: 4,
    },
    release_date: {
        color: '#BBBBBB',
        fontSize: 12,
        lineHeight: 14,
        alignSelf: 'center',
    },
})