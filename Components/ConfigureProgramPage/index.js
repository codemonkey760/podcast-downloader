import React from 'react'
import { useSelector } from 'react-redux'

import { getProgram } from '../../selectors/programs'
import { View, Text } from 'react-native'

function ConfigureProgramPage({ route }) {
    const { programId } = route.params
    const program = useSelector(state => getProgram(state, programId))

    return (
        <View>
            <Text>
                Program details for: { programId }
            </Text>
        </View>
    )
}

export default ConfigureProgramPage
