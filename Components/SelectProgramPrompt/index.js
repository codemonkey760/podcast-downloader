import React from 'react'

import {
    SelectProgramPromptContainer,
    SelectProgramPromptHeader,
    SelectProgramPromptText
} from './styles'

const SelectProgramPrompt = () => (
    <SelectProgramPromptContainer>
        <SelectProgramPromptHeader>Select a Program</SelectProgramPromptHeader>
        <SelectProgramPromptText>Touch a program from the available selections to download podcasts for that program</SelectProgramPromptText>
    </SelectProgramPromptContainer>
)

export default SelectProgramPrompt