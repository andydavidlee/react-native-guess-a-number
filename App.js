import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font' // component for loading fonts
import AppLoading from 'expo-app-loading'// Apploading extends the loading/splash screen time until the required task is complete

// importing components
import Header from './components/Header'

// importing screens
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

// fetches fonts from assets folder
const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

// Handling state with webhooks
const [userNumber, setUserNumber] = useState() // this is the state for when the user has selected a number and hits 'Start'
const [guessRounds, setGuessRounds ] = useState(0)
const [dataLoaded, setDataLoaded] = useState(false)

if (!dataLoaded) {
  return (
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)}
    onError={(err) => console.log(err)}
    /> // startAsync must be a function that returns a promise (like async/await)
  ) 
}

const configureNewGameHandler = () => {
  setGuessRounds(0)
  setUserNumber(null)
}

// Sets the picked number as the new state when the user presses start
const startGameHandler = (selectedNumber) => {
  setUserNumber(selectedNumber)
}

const gameOverHandler = (numOfRounds) => {
  setGuessRounds(numOfRounds)
}

// default screen placed into variable
let content = <StartGameScreen onStartGame={startGameHandler} />

// Conditional logic. Meets the parameters, it will switch to the next screen.
if (userNumber && guessRounds <= 0) {
  content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
} else if (guessRounds > 0) {
  content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
}

  return (
    <View style={styles.screen}>
        <Header title="Guess A Number" />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
