// Component that holds the number chosen by the user after hitting confirm.

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// importing reusable styles. Namely color themes.
import colors from '../constants/colors'

const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            {/* https://reactjs.org/docs/composition-vs-inheritance.html */}
            {/* Above link great to explain props.children. */}
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        // Where the imported theme color is being used.
        color: colors.accent,
        fontSize: 22
    }
})

export default NumberContainer
