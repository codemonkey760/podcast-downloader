import React from 'react'
import { TouchableOpacity } from 'react-native'

import {
    Text,
    TouchableOpacityStyles
} from './styles'

const getButtonTextFromType = (buttonType) => {
    if (buttonType === 'left') {
        return '<--'
    }
    if (buttonType === 'right') {
        return '-->'
    }

    return '...'
}

function ProgramNavButton ({ buttonType, onPress }) {
    return (
        <TouchableOpacity style={TouchableOpacityStyles} onPress={onPress}>
            <Text>{getButtonTextFromType(buttonType)}</Text>
        </TouchableOpacity>
    )
}

export default ProgramNavButton
