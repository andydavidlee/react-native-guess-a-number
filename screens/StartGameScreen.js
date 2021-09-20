// First/Main Screen

// React and React-Native modules
import React, { useState } from 'react'
// View, Text and StyleSheet are the 3 most used modules in React-Native
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

// Imported Components
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = (props) => {

// Using webhooks to change state
const [ enteredValue, setEnteredValue ] = useState('')
const [ confirmed, setConfirmed ] = useState(false)
const [ selectedNumber, setSelectedNumber ] = useState()

// Validating the setEnteredValue to be numbers between 0 to 9
const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
}

// Resets the text field when pressing Reset button
const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
}

// Validates further if there is an integer in the text field. If not, it will send an alert. If yes, It will update the state with that number and reset the text field.
const confirmInputHandler = ()=> {
    const chosenNumber = parseInt(enteredValue)
    if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
        Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
        return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
}

let confirmedOutput

if (confirmed) {
    confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress= {() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
}

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>This is the Start Game Screen!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize="none" 
                    keyboardType="number-pad" 
                    maxLength={2} 
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                    < View style={styles.buttonContainer}>
                        <View style={styles.button}><Button color={Colors.accent} title='Reset' onPress={resetInputHandler} >Reset</Button></View>
                        <View style={styles.button}><Button color={Colors.primary} title='Confirm' onPress={confirmInputHandler} >Confirm</Button></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
})

export default StartGameScreen
