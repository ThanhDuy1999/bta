import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

const Signup = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        //comfirmPassword: '',
        checkTextInputChange: false,
        secureTextEntry: true,
        secureComfirmTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    })

    const textInputChange = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                email: value,
                checkTextInputChange: true,
                isValidUser: true
            })
        } else {
            setData({
                ...data,
                email: value,
                checkTextInputChange: false,
                isValidUser: false
            })
        }
    }

    const handlePasswordChange = (value) => {
        if (value.trim().length >= 6) {
            setData({
                ...data,
                password: value,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: value,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleValidUser = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
            })
        } else {
            setData({
                ...data,
            })
        }
    }

    const handleSignup = () => {
        const email = data.email.trim()
        const password = data.password.trim()
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {

            })
            .catch(e => {
                Alert.alert('Warning','The email is invalid.',
                    [
                        { text: 'OK', onPress: () => { } }
                    ], { cancelable: true })
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF8000' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Register Now!</Text>
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
                        onChangeText={(value) => textInputChange(value)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} />
                    {data.checkTextInputChange ?
                        <Feather
                            name='check-circle'
                            color='green'
                            size={20} />
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Text style={styles.errorMsg}>Email must be correct form.</Text>
                }

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
                        onChangeText={(value) => handlePasswordChange(value)} />
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
                {data.isValidPassword ? null :
                    <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                }

                <View style={styles.button}>
                    <LinearGradient
                        colors={['#4c669f', '#009387']}
                        style={styles.signIn}>
                        <TouchableOpacity
                            onPress={handleSignup}
                            style={styles.signIn}>
                            <Text style={[styles.textSign], { color: '#fff' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <TouchableOpacity
                        onPress={() => navigation.goBack('Login')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                        }]}>
                        <Text style={styles.textSign}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default Signup;

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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
})