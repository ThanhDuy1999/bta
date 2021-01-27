import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class Confirmation extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props.route.params)
    }
    static propTypes = {
        code: PropTypes.string,
    }
    render() {
        const code = this.props.route.params.code;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your ticket code</Text>
                <Text style={styles.code}>{code}</Text>
                <TouchableOpacity onPress = {() => this.props.navigation.goBack()}
                    style = {styles.buttonContainer}>
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
        fontSize: 20,
    },
    code: {
        color: '#333',
        fontSize: 36,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#673AB7',
        borderRadius: 100,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    button: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});