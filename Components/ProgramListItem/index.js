import React from 'react'
import { useNavigation } from '@react-navigation/native'

import ProgramNavButton from '../ProgramNavButton'

import {
    ProgramListItemContainer,
    ProgramTitle
} from './styles'
import {Alert} from "react-native";

const errorAlert = (error) => Alert.alert('Error', error, [{text: 'OK'}])

function ProgramListItem({ programId, name }) {
    const nav = useNavigation()

    const onRightPress = () => {
        nav.navigate({
            name: 'PodcastListPage',
            params: {
                programId: programId
            }
        })
    }

    const onLeftPress = () => {
        nav.navigate({
            name: 'ConfigureProgramPage',
            params: {
                programId: programId
            }
        })
    }

    return (
        <ProgramListItemContainer>
            <ProgramNavButton buttonType={'left'} onPress={onLeftPress} />
            <ProgramTitle>{name}</ProgramTitle>
            <ProgramNavButton buttonType={'right'} onPress={onRightPress} />
        </ProgramListItemContainer>
    )
}

export default ProgramListItem
