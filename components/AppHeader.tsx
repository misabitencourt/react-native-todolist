import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { primaryColor, primaryColorContrast } from './base-style';

const appTitle = 'Todo List';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 13,
        backgroundColor: primaryColor,
        color: primaryColorContrast
    },
});

export function AppHeader(): JSX.Element {

    return (
        <Text style={{...styles.titleText, height: 40}}>
            {appTitle}
        </Text>
    )
}

