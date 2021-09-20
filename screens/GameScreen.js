import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Importing Reusable Components
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

// If a function doesn't rely on props or state, you can build it outside the component function.
const generateRandomBetween = ( min, max, exclude ) => {
    min = Math.ceil(min) // Math.ceil() is a javaScript function that rounds the number in question to the next whole number eg. if the number in question was 0.7, Math.ceil will round it up to 1.
    max = Math.floor(max) // Oppisite of Math.ceil(). Rounds down the nearest whole number.
    const rndNum = Math.floor(Math.random() * (max - min)) + min // Math.random() picks number between 0 and less than 1 (eg. 0.99). This entire sum will generate a random number.
    if (rndNum === exclude) { // if the generator comes up with an excluded number, it will restart the function
        return generateRandomBetween(min, max, exclude) // Calling a function from inside another function is called recursion
    } else {
        return rndNum
    }
}

const renderListItem = (value, numOfRounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>    
)

const GameScreen = (props) => {

// Using webhooks for initial and change state
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(
        initialGuess
        // generateRandomBetween(1, 100, props.userChoice) // Guessed number of the computer. New state when user gives a new 'lower'/'greater' hint
        ) 
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [availableDeviceWidth, setavailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setavailableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1) //With useRef, you can use to bind to elements so that you can access them in your code 
    const currentHigh = useRef(100) // in this case, allow you to define a value which survives component re-renders
// The 'currents' set a new min and max as the logics guesses are updated.
    const { userChoice, onGameOver } = props // props deconstructing so that it can be used in the dependencise array in useEffect()

    // useEffect allows you to run logic after the render cycle
    // First argument is the function that is fired after the render cycle
    // Second argument is the array of dependencies of the function. specify any dependencies that should have make the function fire.
    
    useEffect(() => {
        const updateLayout = () => {
            setavailableDeviceWidth(Dimensions.get('window').width)
            setavailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })
    
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    // This function executes when we hit the LOWER or GREATER button
const nextGuessHandler = (direction) => {
    if (
        (direction === 'lower' && currentGuess < props.userChoice) || 
        (direction === 'greater' && currentGuess > props.userChoice))
   {Alert.alert('Don\'t lie!', 'You know this is wrong...', [{text: 'Sorry!', style: 'Cancel'}])
    return
}
if (direction === 'lower') {
    currentHigh.current = currentGuess
} else {
    currentLow.current = currentGuess
} 
const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
setCurrentGuess(nextNumber)
setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
}

let listContainerStyle = styles.listContainer

if (availableDeviceWidth < 350) {
    listContainerStyle = listContainerBig
}

if (availableDeviceHeight < 500) {
    return ( 
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton onPress= {nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton> 
            <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress= {nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </View>
            <View style={listContainerStyle}>
            <ScrollView contentContainerStyle={styles.list} >
                {pastGuesses.map((guess, index)=> (
                    renderListItem(guess, pastGuesses.length - index)
                    ))}
            </ScrollView>
            </View>
        </View>
    )
}

    return (
        <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <MainButton onPress= {nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton> 
            <MainButton onPress= {nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
        </Card>
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.list} >
            {pastGuesses.map((guess, index)=> (
                renderListItem(guess, pastGuesses.length - index)
                ))}
        </ScrollView>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
    }
})

export default GameScreen
