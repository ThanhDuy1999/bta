import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    Dimensions,
    LayoutAnimation,
    PanResponder,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';
import Options from './Options'
import { days, times } from '../Data';

const { width, height } = Dimensions.get('window');

const defaultHeight = height * 0.67;

class MoviePopup extends Component {
    static propType = {
        isOpen: PropTypes.bool.isRequired,
        movie: PropTypes.object,
        chosenDay: PropTypes.number,
        chosenTime: PropTypes.number,
        onChooseDay: PropTypes.func,
        onChooseTime: PropTypes.func,
        onBook: PropTypes.func,
        onClose: PropTypes.func,
    }

    state = {
        position: new Animated.Value(this.props.isOpen ? 0 : height),
        opacity: new Animated.Value(0),
        height: defaultHeight,
        expanded: false,
        visible: this.props.isOpen,
    }

    previousHeight = 0

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (dx !== 0 && dy === 0) {
                    return true;
                }
                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.previousHeight = this.state.height;
            },
            onPanResponderMove: (evt, gestureState) => {
                const { dy, vy } = gestureState;
                let newHeight = this.previousHeight - dy;

                LayoutAnimation.easeInEaseOut();

                if (newHeight > height - height / 5) {
                    this.setState({ expanded: true });
                } else {
                    this.setState({ expanded: false });
                }

                if (vy < -0.75) {
                    this.setState({
                        expanded: true,
                        height: height
                    });
                }
                else if (vy > 0.75) {
                    this.props.onClose();
                }
                else if (vy > 0.75) {
                    this.props.onClose();
                }
                else if (newHeight > height) {
                    this.setState({ height: height });
                }
                else {
                    this.setState({ height: newHeight });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const { dy } = gestureState;
                const newHeight = this._previousHeight - dy;
                if (newHeight < defaultHeight) {
                    this.props.onClose();
                }
                this.previousHeight = this.state.height;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {

                return true;
            }
        })
    }

    componentWillReceiveProps(nextProp) {
        if (!this.props.isOpen && nextProp.isOpen) {
            this.animatedOpen();
        }
        else if (this.props.isOpen && !nextProp.isOpen) {
            this.animatedClose();
        }
    }

    animatedOpen() {
        this.setState({ visible: true }, () => {
            Animated.parallel([
                // Animate opacity
                Animated.timing(
                    this.state.opacity, { toValue: 0.5, useNativeDriver: true } // semi-transparent
                ),
                // And slide up
                Animated.timing(
                    this.state.position, { toValue: 0, useNativeDriver: true } // top of the screen
                ),
            ]).start();
        });
    }

    animatedClose() {
        Animated.parallel([
            // Animate opacity
            Animated.timing(
                this.state.opacity, { toValue: 0, useNativeDriver: true } // transparent
            ),
            // Slide down
            Animated.timing(
                this.state.position, { toValue: height, useNativeDriver: true } // bottom of the screen
            ),
        ]).start(() => this.setState({
            // Reset to default values
            height: defaultHeight,
            expanded: false,
            visible: false,
        }));
    }

    getStyles = () => {
        return {
            imageContainer: this.state.expanded ? {
                width: width / 2,         // half of screen widtj
            } : {
                    maxWidth: 110,            // limit width
                    marginRight: 10,
                },
            movieContainer: this.state.expanded ? {
                flexDirection: 'column',  // arrange image and movie info in a column
                alignItems: 'center',     // and center them
            } : {
                    flexDirection: 'row',     // arrange image and movie info in a row
                },
            movieInfo: this.state.expanded ? {
                flex: 0,
                alignItems: 'center',     // center horizontally
                paddingTop: 20,
            } : {
                    flex: 1,
                    justifyContent: 'center', // center vertically
                },
            title: this.state.expanded ? {
                textAlign: 'center',
            } : {},
        };
    }

    render() {
        const {
            movie,
            chosenDay,
            chosenTime,
            onChooseDay,
            onChooseTime,
            onBook
        } = this.props;
        if (!this.state.visible) {
            return null;
        }
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.props.onClose}>
                    <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]} />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[styles.modal, {
                        height: this.state.height,
                        transform: [{ translateY: this.state.position }, { translateX: 0 }]
                    }]}>

                    <View style={styles.content}>
                        <View
                            style={[styles.movieContainer, this.getStyles().movieContainer]}
                            {...this.panResponder.panHandlers}>
                            <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
                                <Image source={{ uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}` }} style={styles.image} />
                            </View>

                            <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                                <Text style={[styles.title, this.getStyles().title]}>{movie.title}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.sectionHeader}>Day</Text>
                        <Options
                            values={days}
                            chosen={chosenDay}
                            onChoose={onChooseDay}
                        />
                        <Text style={styles.sectionHeader}>Showtime</Text>
                        <Options
                            values={times}
                            chosen={chosenTime}
                            onChoose={onChooseTime}
                        />
                    </View>

                    <View style={styles.footer}>
                        <TouchableHighlight
                            underlayColor="#9575CD"
                            style={styles.buttonContainer}
                            onPress={onBook}
                        >
                            <Text style={styles.button}>Book My Tickets</Text>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
            </View >
        )
    }
}
export default MoviePopup;

const styles = StyleSheet.create({
    //Main Container
    container: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        justifyContent: 'flex-end',         // align popup at the bottom
        backgroundColor: 'transparent',     // transparent background
    },
    //Semi
    backdrop: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        backgroundColor: 'black',
    },
    //Popup
    modal: {
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
    },
    //Movie container
    movieContainer: {
        flex: 1,                            // take up all available space
        marginBottom: 20,
    },
    imageContainer: {
        flex: 1,                            // take up all available space
    },
    image: {
        borderRadius: 10,                   // rounded corners
        ...StyleSheet.absoluteFillObject,   // fill up all space in a container
    },
    movieInfo: {
        backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    },
    title: {
        fontSize: 20,
    },
    release_date: {
        color: '#BBBBBB',
        fontSize: 14,
    },
    sectionHeader: {
        color: '#AAAAAA',
    },
    //Footer
    footer: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: '#673AB7',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    button: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});