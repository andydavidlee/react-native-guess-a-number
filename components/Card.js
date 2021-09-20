// Reusable component creating cards.

import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create ({
    card: {
        shadowColor: 'black', // for IOS
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5, // this is for android only
        padding: 20,
        borderRadius: 10
    }
})

export default Card
