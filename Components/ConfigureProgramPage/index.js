import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProgram } from '../../selectors/programs'
import { updateProgram } from '../../actions/programs'
import { NamingMode } from '../../Util/Namer'

import {
    Container,
    Form,
    DetailHeader,
    DetailTextInput,
    DetailPicker,
    DetailPickerItem,
    ButtonBox,
    Button
} from './styles'

function ConfigureProgramPage({ navigation, route }) {
    const { programId } = route.params
    const program = useSelector(state => getProgram(state, programId))
    const dispatch = useDispatch()

    const [name, setName] = useState(program.name)
    const [namingMode, setNamingModeRaw] = useState(program.namingMode)
    const [titleRegex, setTitleRegex] = useState(program.titleRegex)
    const [fileNamePattern, setFileNamePattern] = useState(program.fileNamePattern)

    const setNamingMode = (newNamingMode, modeIndex) => {
        setNamingModeRaw(NamingMode[newNamingMode])
    }

    const onDiscardPress = () => {
        navigation.navigate({name: 'ProgramPage'})
    }

    const onSavePress = () => {
        dispatch(updateProgram(
            programId,
            name,
            namingMode,
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
                <DetailPicker selectedValue={namingMode.description} onValueChange={setNamingMode}>
                    <DetailPickerItem value={NamingMode.NONE.description} label={'None'}/>
                    <DetailPickerItem value={NamingMode.TITLE_REGEX.description} label={'Title Regex'}/>
                </DetailPicker>
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
