// First/Main Screen

// React and React-Native modules
import React, { useEffect, useState } from 'react'
// View, Text and StyleSheet are the 3 most used modules in React-Native
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'

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
const [buttonWidth, setbuttonWidth] = useState(Dimensions.get('window').width /4)

// Validating the setEnteredValue to be numbers between 0 to 9
const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
}

// Resets the text field when pressing Reset button
const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
}

useEffect(() => {
    const updateLayout = () => {
        setbuttonWidth(Dimensions.get('window').width /4)//Dimension measures pixels in the space. Pick 'window' over 'screen' then it will measure the entire height of the screen for android.
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
        Dimensions.removeEventListener('change', updateLayout)
    }
})


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
// {/* Makes sure the soft keyboard does not overlop the input you are typing in. */}
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}> 
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
                                <View style={buttonWidth}><Button color={Colors.accent} title='Reset' onPress={resetInputHandler} >Reset</Button></View>
                                <View style={buttonWidth}><Button color={Colors.primary} title='Confirm' onPress={confirmInputHandler} >Confirm</Button></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
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
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
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
