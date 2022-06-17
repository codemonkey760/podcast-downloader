import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getProgram } from '../../selectors/programs'

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

    const [name, setName] = useState(program.name)

    const onDiscardPress = () => {
        navigation.pop()
    }

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
                <ButtonBox>
                    <Button title={'DISCARD'} onPress={onDiscardPress}/>
                    <Button title={'SAVE'} />
                </ButtonBox>
            </Form>
        </Container>
    )
}

export default ConfigureProgramPage
