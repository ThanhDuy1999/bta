import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import firebase from 'firebase'
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const handleSignOut = () => {
    firebase
        .auth()
        .signOut()
        .then(
            (response) => {

            })
}
export function DrawerContent(props,{navigation}) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={null}
                                size={50} />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Thanh Duy</Title>
                                <Caption style={styles.caption}>@meanie</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
                                <Caption style={styles.caption}>Like</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>30</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="home"
                                    color={color}
                                    size={size} />
                            )}
                            label="Home"
                            onPress={() => props.navigation.navigate("Home")}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="user-plus"
                                    color={color}
                                    size={size} />
                            )}
                            label="Social"
                            onPress={() => props.navigation.navigate("Social")}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="heart"
                                    color={color}
                                    size={size} />
                            )}
                            label="Favorites"
                            onPress={() => { }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome
                            name="sign-out"
                            color={color}
                            size={size} />
                    )}
                    label="Sign out"
                    onPress={handleSignOut}
                />

            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});