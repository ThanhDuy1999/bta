import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class Confirmation extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props.route.params)
    }
    static propTypes = {
        code: PropTypes.string,
    }
    render() {
        const code = this.props.route.params.code;
        const movie = this.props.route.params.movie;
        const day = this.props.route.params.day;
        const time = this.props.route.params.time;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your ticket code:</Text>
                <Text style={styles.code}>{code}</Text>
                <QRCode
                    value={code ? code : 'NA'}
                    size={250}
                    color="black"
                    backgroundColor="white"
                    logo={{ uri: 'https://github.com/ThanhDuy1999/bta/blob/master/src/assets/images/logo.png?raw=true' }}
                    logoSize={30}
                    logoMargin={2}
                    logoBorderRadius={15}
                    logoBackgroundColor="orange" />
                <View style = {styles.main}>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Movie</Text>
                        <Text style={styles.infoText}>{movie}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Day</Text>
                        <Text style={styles.infoText}>{day}</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Time</Text>
                        <Text style={styles.infoText}>{time}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={styles.buttonContainer}>
                    <Text style={styles.button}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Confirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: '#333',
        fontSize: 25,
        marginTop: -30,
    },
    code: {
        color: '#333',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#673AB7',
        borderRadius: 100,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 30,
    },
    button: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    infoText: {
        color: '#333',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    infoTitle: {
        color: '#333',
        fontSize: 20,
        alignSelf: 'center'
    },
    info: {
        marginTop: 30,
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    main: {
        flexDirection: 'row',
    },
});