import React from 'react'

import {
    SelectProgramPromptContainer,
    SelectProgramPromptHeader,
    SelectProgramPromptText
} from './styles'

const SelectProgramPrompt = () => (
    <SelectProgramPromptContainer>
        <SelectProgramPromptHeader>Select a Program</SelectProgramPromptHeader>
        <SelectProgramPromptText>Touch the left arrow for a program to configure it</SelectProgramPromptText>
        <SelectProgramPromptText>Touch the right arrow for a program to download podcasts</SelectProgramPromptText>
    </SelectProgramPromptContainer>
)

export default SelectProgramPrompt
