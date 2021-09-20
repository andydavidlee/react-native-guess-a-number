import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

import colors from '../constants/colors'

const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over</TitleText>
                <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="cover" source={require('../assets/success.png')} />
                {/* <Image style={styles.image} resizeMode="cover" source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} /> */}
                </View>
                <View style={styles.resultContainer}>
                {/* Nested <Text> in a <Text> will inherit the styles from its parent. */}
                <BodyText>Number of Rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
                <BodyText>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 20
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 20
    },
    highlight: {
        color: colors.primary,
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
})

export default GameOverScreen
