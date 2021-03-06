// Reusable text input component.


import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

const Input = (props) => {
    return (
        <View>
            {/* spread operators with the ability to grab props from the StartGameScreen.js and use them. */}
            {/* The style prop is using spread operators to use styles from this component and the component about */}
            <TextInput {...props} style={{ ...styles.input, ...props.style }} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
})

export default Input
