import React from 'react'
import { useSelector } from 'react-redux'

import { getProgram } from '../../selectors/programs'
import { View, Text } from 'react-native'

import {
    Container,
    Form,
    DetailHeader,
    DetailText
} from './styles'

function ConfigureProgramPage({ route }) {
    const { programId } = route.params
    const program = useSelector(state => getProgram(state, programId))

    return (
        <Container>
            <Form>
                <DetailHeader>ID</DetailHeader>
                <DetailText>{programId}</DetailText>
                <DetailHeader>Name</DetailHeader>
                <DetailText>{program.name}</DetailText>
                <DetailHeader>Naming Mode</DetailHeader>
                <DetailText>{program.namingMode.description}</DetailText>
                {program.titleRegex && (
                    <>
                        <DetailHeader>Title Regex</DetailHeader>
                        <DetailText>{program.titleRegex}</DetailText>
                    </>
                )}
                {program.fileNamePattern && (
                    <>
                        <DetailHeader>File Name Pattern</DetailHeader>
                        <DetailText>{`${program.fileNamePattern}.{ext}`}</DetailText>
                    </>
                )}
            </Form>
        </Container>
    )
}

export default ConfigureProgramPage
