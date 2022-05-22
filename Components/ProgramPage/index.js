import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import { getProgramsList } from '../../selectors/programs'

import {
    ProgramPageContainer
} from './styles'

import SelectProgramPrompt from '../SelectProgramPrompt'

const ProgramPage = ({ programsList }) => (
    <ProgramPageContainer>
        <SelectProgramPrompt />
    </ProgramPageContainer>
)

const mapStateToProps = (state) => ({
    programsList: getProgramsList(state)
})

export default connect(mapStateToProps)(ProgramPage)
