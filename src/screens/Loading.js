import React, {Component} from 'react';
import { 
    View,
    Text,
    ImageBackground,
    Image,
} from 'react-native';

var bg = require('../assets/images/background.jpg');
var logo = require('../assets/images/logo.png');

export default class Loading extends React.Component {
    constructor(props)
    {
        super(props);
        setTimeout(() => 
        {
            this.props.navigation.replace("Welcome");
        },5000);
    }

    render() {
        return (
            <ImageBackground
                source = {bg}
                style = {{height:'100%', width:'100%'}}>
                    <View
                        style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image 
                                source = {logo}
                                style= {{height:100, width:100}}>
                            </Image>
                    </View>
            </ImageBackground>
        )
    }
}