import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Loading from '../component/Loading';

import { fetchPopularMovies } from '../api/TMDB';

const { width, height } = Dimensions.get('window');

const Movie = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [searchNow, setSearchNow] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchPopularMovies(search, movies).then((data) => {
            setMovies(data);
            setLoading(false);
        })
    }, [searchNow]);

    return loading ? (
        <Loading />
    ) : (
            <View style={styles.container}>
                <View>
                    <Image
                        source={{
                            uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`
                        }}
                        style={styles.banner} />
                    <View>
                        <Text style={styles.bannerInfoCard}>
                            <Text style={styles.bannerTitle}>
                                {movies[0]?.original_title.substr(0, 20)}{":\n"}
                            </Text>
                            <Text style={styles.bannerOverview}>
                                {movies[0]?.overview.substr(0, 100) + '...'}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.search}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Search movie'}
                        value={search}
                        onChangeText={(text) => setSearch(text)} />
                    <TouchableOpacity
                        onPress={() => {
                            setSearchNow(!searchNow);
                            setMovies([]);
                        }}>
                        <FontAwesome
                            name={'search'}
                            size={20}
                            color="black"
                            style={{ alignSelf: 'center', marginHorizontal: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.movieList}>
                    <FlatList
                        data={movies}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <Card style={styles.movieCard} key={index}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Detail', { movie: item })} >
                                        <Image
                                            source={{ uri: `http://image.tmdb.org/t/p/w780${item.poster_path}` }}
                                            style={{ width: 200, height: 350, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                </Card>
                            )
                        }}
                    />
                </View>
            </View>
        );
}
export default Movie;

const styles = StyleSheet.create({
    container: {
        flex: 1         // start below status bar
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
    search: {
        position: 'absolute',
        top: 160,
        margin: 20,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        zIndex: 100,
    },
    input: {
        padding: 10,
        flex: 1,
    },
    movieList: {
        top: height * 0.05,
        marginBottom: 235,
    },
    movieCard: {
        flex: 1,
        height: 330,
        margin: 5,
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: 10
    },
});