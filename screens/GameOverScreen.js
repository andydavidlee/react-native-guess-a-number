import { processFontFamily } from 'expo-font'
import React from 'react'
import { View, Text, StyleSheet, Button, Image} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

import colors from '../constants/colors'

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over</TitleText>
            <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode="cover" source={require('../assets/success.png')} />
             {/* <Image style={styles.image} resizeMode="cover" source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} /> */}
            </View>
            {/* Nested <Text> in a <Text> will inherit the styles from its parent. */}
            <BodyText>Number of Rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
            <BodyText>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 300,
        height: 300,
        margin: 30,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'
    },
    highlight: {
        color: colors.primary,
        fontSize: 18
    }
})

export default GameOverScreen
