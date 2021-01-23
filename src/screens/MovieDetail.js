import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import Loading from '../component/Loading';
import ProgressBar from '../component/ProgressBar';
import ProfileThumb from '../component/ProfileThumb';
import BackButton from '../component/BackButton';
import InfoCard from '../component/InfoCard';

import { fetchCredits } from '../api/TMDB'

const { width, height } = Dimensions.get('window');
function MovieDetail({ navigation, route }) {
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [director, setDirector] = useState('');
    const { movie } = route.params;

    useEffect(() => {
        setLoading(true);
        fetchCredits(movie.id).then((data) => {
            setCredits(data.credits);
            setDirector(data.director);
            setLoading(false);
        });
    }, []);

    return loading ? (
        <Loading />
    ) : (
            <View style={styles.container}>
                <View>
                    <BackButton navigation={navigation} />
                    <Image
                        source={{
                            uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
                        }}
                        style={styles.banner} />
                    <InfoCard movie={movie} director={director} />
                </View>

                <View style={styles.credit}>
                    <>
                        <Text style={styles.title}>CAST</Text>
                        {credits && (
                            <FlatList
                                data={credits.cast}
                                renderItem={({ item }) => <ProfileThumb item={item} />}
                                horizontal
                            />
                        )}
                    </>
                </View>
            </View>
        )
}
export default MovieDetail;

const styles = StyleSheet.create({
    banner: {
        width: width,
        height: 250
    },

    credit: {
        flex: 1,
        padding: 10,
    },

    container: {
        flex: 1,
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#212121',
    },

    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});