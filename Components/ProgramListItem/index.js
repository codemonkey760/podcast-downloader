import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
    ProgramListItemContainer,
    ProgramTitle
} from './styles'

function ProgramListItem({ programId, name }) {
    const nav = useNavigation()

    const onPress = () => {
        nav.navigate({
            name: 'PodcastListPage',
            params: {
                programId: programId
            }
        })
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <ProgramListItemContainer>
                <ProgramTitle>{name}</ProgramTitle>
            </ProgramListItemContainer>
        </TouchableOpacity>
    )
}

export default ProgramListItem