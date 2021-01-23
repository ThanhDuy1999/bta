import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
} from 'react-native';

import Loading from '../component/Loading';
import MoviePoster from '../component/MoviePoster';
import MoviePopup from './MoviePopUp';

import { fetchMovies } from '../api/TMDB';

const cols = 2, rows = 2;
const { width, height } = Dimensions.get('window');

const MainTicket = (props) => {
    const [movies, setMovies] = useState([]);
    const [movieInfo, setMovieInfo] = useState();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [chosenDay, setChosenDay] = useState(0);
    const [chosenTime, setChosenTime] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchMovies(search, movies).then((data) => {
            setMovies(data);
            setLoading(false);
        })
    }, []);

    const openMovie = (movie) => {
        setPopupIsOpen(true);
        setMovieInfo(movie);
    }

    const closeMovie = () => {
        setPopupIsOpen(false);
        setChosenDay(0);
        setChosenTime(null);
    }

    const chooseDay = (day) => {
        setChosenDay(day);
    }

    const chooseTime = (time) => {
        setChosenTime(time);
    }

    const bookTicket = () => {
        if (chosenTime == null) {
            alert('Please select time');
        } else {
            closeMovie();
            props.navigation.push(
                'Confirmation',
                {
                    code: Math.random().toString(36).substring(6).toUpperCase(),
                }
            );
        }
    }

    return loading ? (
        <Loading />
    ) : (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        {movies.map((movie, index) =>
                            <MoviePoster
                                movie={movie}
                                onOpen={openMovie}
                                key={index} />)}
                    </ScrollView>
                    <MoviePopup
                        movie={movieInfo}
                        isOpen={popupIsOpen}
                        onClose={closeMovie}
                        chosenDay={chosenDay}
                        chosenTime={chosenTime}
                        onChooseDay={chooseDay}
                        onChooseTime={chooseTime}
                        onBook={bookTicket} />
                </SafeAreaView>
            </View>
        )
}
export default MainTicket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width,
        height: 200
    },
    bannerInfoCard: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(21,21,21,0.5)',
    },
    bannerTitle: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1.2,
    },
    bannerOverview: {
        color: 'white',
    },
    scrollContent: {
        flexDirection: 'row',   // arrange posters in rows
        flexWrap: 'wrap',       // allow multiple rows
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        borderRadius: 10,
        ...StyleSheet.absoluteFillObject, //fill space in a container
    },
    title: {
        fontSize: 14,
        marginTop: 4,
    },
    releaseDate: {
        color: '#BBBBBB',
        fontSize: 12,
        lineHeight: 14,
    },
})