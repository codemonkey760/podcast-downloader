import React from 'react'
import { connect } from 'react-redux'

import { getProgramsList } from '../../selectors/programs'
import { VersionNumber } from '../../Util/Verison'

import {
    ProgramPageContainer,
    ProgramScrollView,
    VersionText,
} from './styles'

import SelectProgramPrompt from '../SelectProgramPrompt'
import ProgramListItem from '../ProgramListItem'

const ProgramPage = ({ programsList }) => {
    const programIds = Object.keys(programsList)

    const listItems = programIds.map((id) => {
        const { name } = programsList[id]

        return (
            <ProgramListItem key={Math.random()} programId={id} name={name} />
        )
    })

    return (
        <ProgramPageContainer>
            <SelectProgramPrompt />
            <ProgramScrollView>
                {listItems}
            </ProgramScrollView>
            <VersionText>Version: {VersionNumber}</VersionText>
        </ProgramPageContainer>
    )
}

const mapStateToProps = (state) => ({
    programsList: getProgramsList(state)
})

export default connect(mapStateToProps)(ProgramPage)
