import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProgram } from '../../selectors/programs'
import { updateProgram } from '../../actions/programs'

import {
    Container,
    Form,
    DetailHeader,
    DetailTextInput,
    ButtonBox,
    Button
} from './styles'

function ConfigureProgramPage({ navigation, route }) {
    const { programId } = route.params
    const program = useSelector(state => getProgram(state, programId))
    const dispatch = useDispatch()

    const [name, setName] = useState(program.name)
    const [titleRegex, setTitleRegex] = useState(program.titleRegex)
    const [fileNamePattern, setFileNamePattern] = useState(program.fileNamePattern)

    const onDiscardPress = () => {
        navigation.navigate({name: 'ProgramPage'})
    }

    const onSavePress = () => {
        dispatch(updateProgram(
            programId,
            name,
            program.namingMode,
            titleRegex,
            fileNamePattern
        ))
        navigation.navigate({name: 'ProgramPage'})
    }

    return (
        <Container>
            <Form>
                <DetailHeader>ID</DetailHeader>
                <DetailTextInput>{programId}</DetailTextInput>
                <DetailHeader>Name</DetailHeader>
                <DetailTextInput value={name} onChangeText={setName} />
                <DetailHeader>Naming Mode</DetailHeader>
                <DetailTextInput>{program.namingMode.description}</DetailTextInput>
                <DetailHeader>Title Regex</DetailHeader>
                <DetailTextInput value={titleRegex} onChangeText={setTitleRegex} />
                <DetailHeader>File Name Pattern</DetailHeader>
                <DetailTextInput value={fileNamePattern} onChangeText={setFileNamePattern} />
                <ButtonBox>
                    <Button title={'DISCARD'} onPress={onDiscardPress} />
                    <Button title={'SAVE'} onPress={onSavePress} />
                </ButtonBox>
            </Form>
        </Container>
    )
}

export default ConfigureProgramPage
