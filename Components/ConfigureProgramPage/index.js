import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { getProgram } from '../../selectors/programs'

import {
    Container,
    Form,
    DetailHeader,
    DetailTextInput
} from './styles'

function ConfigureProgramPage({ route }) {
    const { programId } = route.params
    const program = useSelector(state => getProgram(state, programId))

    const [name, setName] = useState(program.name)

    return (
        <Container>
            <Form>
                <DetailHeader>ID</DetailHeader>
                <DetailTextInput>{programId}</DetailTextInput>
                <DetailHeader>Name</DetailHeader>
                <DetailTextInput value={name} onChangeText={setName}></DetailTextInput>
                <DetailHeader>Naming Mode</DetailHeader>
                <DetailTextInput>{program.namingMode.description}</DetailTextInput>
                {program.titleRegex && (
                    <>
                        <DetailHeader>Title Regex</DetailHeader>
                        <DetailTextInput>{program.titleRegex}</DetailTextInput>
                    </>
                )}
                {program.fileNamePattern && (
                    <>
                        <DetailHeader>File Name Pattern</DetailHeader>
                        <DetailTextInput>{`${program.fileNamePattern}.{ext}`}</DetailTextInput>
                    </>
                )}
            </Form>
        </Container>
    )
}

export default ConfigureProgramPage
