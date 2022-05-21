import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import { getProgramsList } from '../../selectors/programs'

const ProgramPage = ({ programsList }) => {
    const programIds = Object.keys(programsList) ?? []
    const isPlural = programIds.length !== 1

    const generateProgramItem = (id) => {
        const { name, namingMode } = programsList[id]

        return (
            <>
                <Text>ID: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Naming Mode: {namingMode.description}</Text>
                <Text>{' '}</Text>
            </>
        )
    }

    return <>
        <Text>HI!</Text>
        <Text>There {isPlural ? 'are' : 'is'} {programIds.length} program{(isPlural) ? 's': ''} in the redux store</Text>
        <Text>They are:</Text>
        <Text>{' '}</Text>
        {programIds.map(generateProgramItem)}
    </>
}

const mapStateToProps = (state) => ({
    programsList: getProgramsList(state)
})

export default connect(mapStateToProps)(ProgramPage)
