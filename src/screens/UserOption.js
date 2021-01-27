import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const colorDefault = 'rgba(255, 255, 255, 1)', //white
    colorSelected = 'rgba(103,58,183, 1)'; //purple

class UserOption extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        isChosen: PropTypes.bool.isRequired,
        onChosen: PropTypes.func,
    }

    state = {
        background: new Animated.Value(0)
    }

    componentWillMount() {
        if (this.props.isChosen) {
            this.animateSelect();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isChosen && nextProps.isChosen) {
            this.animateSelect();
        } else if (this.props.isChosen && !nextProps.isChosen) {
            this.animateDeselect();
        }
    }

    animateSelect() {
        Animated.timing(this.state.background, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    animateDeselect() {
        Animated.timing(this.state.background, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    render() {
        const { value, isChosen, onChoose } = this.props;
        const backgroundColorAnimation = this.state.background.interpolate({
            inputRange: [0, 100],
            outputRange: [colorDefault, colorSelected]
        });

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onChoose}>
                <Animated.View
                    style={[styles.container, { backgroundColor: backgroundColorAnimation }]}>
                    <Text style={{ color: isChosen ? colorDefault : colorSelected }}>
                        {value}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
export default UserOption;

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        borderColor: colorSelected,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
})