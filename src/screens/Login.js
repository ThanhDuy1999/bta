import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import firebase from 'firebase'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';

const Login = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        checkTextInputChange: false,
        secureTextEntry: true,
    })

    const textInputChange = (value) => {
        if (value.trim().length >= 0) {
            setData({
                ...data,
                email: value,
                checkTextInputChange: true,
            })
        } else {
            setData({
                ...data,
                email: value,
                checkTextInputChange: false,
            })
        }
    }

    const handlePasswordChange = (value) => {
        if (value.trim().length >= 0) {
            setData({
                ...data,
                password: value,
            })
        } else {
            setData({
                ...data,
                password: value,
            })
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleLogin = () => {
        const email = data.email.trim()
        const password = data.password.trim()
        if (data.email.trim() != '' && data.password.trim() != '') {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    navigation.navigate("Home")
                })
                .catch(e => {
                    Alert.alert('Warning','The password is invalid or the user does not have a password.',
                        [
                            { text: 'OK', onPress: () => { } }
                        ], { cancelable: true })
                })
        } else {
            Alert.alert('Warning', 'Enter email and password',
                [
                    { text: 'OK', onPress: () => { } }
                ], { cancelable: true })
        }
    }

    const handleForgotPassword = () => {
        const email = data.email.trim()
        if (data.email.trim() != '') {
            firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then((response) => {
                alert('Please check your email...')
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF8000' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFooter}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name='user-o'
                        color='#05375a'
                        size={20} />
                    <TextInput
                        placeholder='Your Email'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={value => textInputChange(value)}
                    />
                    {data.checkTextInputChange ?
                        <Feather
                            name='check-circle'
                            color='green'
                            size={20} />
                        : null}
                </View>

                <Text style={[styles.textFooter, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name='lock'
                        color='#05375a'
                        size={20} />
                    <TextInput
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={value => handlePasswordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name='eye-off'
                                color='grey'
                                size={20} />
                            :
                            <Feather
                                name='eye'
                                color='grey'
                                size={20} />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={{ color: '#FF6347', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <LinearGradient
                        style={styles.signIn}
                        colors={['#4c669f', '#009387']}>
                        <TouchableOpacity
                            // edit
                            onPress={handleLogin}
                            style={styles.signIn}>
                            <Text style={[styles.textSign], { color: '#fff' }}>Sign In</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                        }]}>
                        <Text style={styles.textSign}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF8000',
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    textFooter: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        marginTop: Platform.OS === 'android' ? -12 : 0,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 13,
        fontWeight: 'bold'
    },
});