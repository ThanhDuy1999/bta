import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';

    const Welcome = ({ navigation }) => {
        return (
            <View style = {styles.container}>
                <StatusBar backgroundColor = '#FF8000' barStyle = 'light-content'/>
                <View style = {styles.header}>
                    <Image 
                        source = {require('../assets/images/logo.png')}
                        style = { styles.logo }
                        resizeMode = 'stretch'
                    />
                </View>
                <View style = {styles.footer}>
                    <Text style = { styles.title }>Welcome to #NSND</Text>
                    <Text style={styles.text}>We have what you need</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.replace('Login')}>
                            <LinearGradient 
                                colors = {['#4c669f' , '#009387']}
                                style = { styles.signIn}>
                                <Text style = { styles.textSignIn }>Get started </Text>
                                <FontAwesome
                                    name = 'angle-double-right'
                                    color = '#fff'
                                    size = {20}/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
export default Welcome;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF8000',
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 60
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSignIn: {
        color: 'white',
        fontWeight: 'bold'
    }
  });