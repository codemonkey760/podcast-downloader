import React from 'react'

import {
    Container,
    Text
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

function ProgramNavButton ({ buttonType }) {
    return (
        <Container>
            <Text>{getButtonTextFromType(buttonType)}</Text>
        </Container>
    )
}

export default ProgramNavButton
