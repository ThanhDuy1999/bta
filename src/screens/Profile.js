import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';

const Profile = () => {
    const [profileImage, setProfileImage] = useState();

    const getPermission = async () => {
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Photo Permission !!! :)",
                message:
                    "#NSND needs access to your camera " +
                    "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        )
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibrary(result, (response) => {
            //console.log('Response = ', response)

            if (response.didCancel) {
                alert('User cancelled image picker')
                return
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Library not available')
                return
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied')
                return
            } else if (response.errorCode == 'other') {
                alert(response.errorMessage)
                return
            }
            setProfileImage(response.uri);
            console.log(response.uri);
        })
    }


    const addProfileImage = async () => {
        const status = await getPermission();

        if (!status == "granted") {
            alert('We need permission to access your camera')
        } else {
            pickImage()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'column', marginTop: 15 }}>
                    <TouchableOpacity onPress={addProfileImage} style={styles.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style ={styles.imageProfile} />
                        ) : (
                                <View style={styles.imageDefault}>
                                    <FontAwesome name="plus" size={24} color="#ffffff" />
                                </View>)}
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Thanh Duy</Title>
                        <Caption style={styles.caption}>@meanie</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <FontAwesome name="map-marker" size={20} color="#777777" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>Ho Chi Minh City</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="phone" size={20} color="#777777" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>+28-935029281</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="envelope" size={20} color="#777777" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>vothanhduy3107@gmail.com</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                }]}>
                    <Title>140</Title>
                    <Caption>Score</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Booking</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome name="heart" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
    imageContainer: {
        backgroundColor: '#e1e2e6',
        width: 160,
        height: 160,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 10,
        overflow: 'hidden',
    },
    imageDefault: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    imageProfile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})