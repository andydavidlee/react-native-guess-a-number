// Header Component

import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'ios' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    title: {
        color: Platform.OS === 'ios' ? 'white' : 'black'
    }
})

export default Header
