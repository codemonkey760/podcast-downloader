import {
    Container,
    DetailBox,
    DetailHeader,
    DetailText,
    BackButton
} from './styles'

function PodcastDetailsPage({navigation, route}) {
    const onPressHandler = () => {
        navigation.navigate({name: 'ProgramPage'})
    }

    return (
        <Container>
            <DetailBox>
                <DetailHeader>Podcast ID:</DetailHeader>
                <DetailText>Something</DetailText>
                <DetailHeader>Description:</DetailHeader>
                <DetailText>Long description</DetailText>
            </DetailBox>
            <BackButton title='Back' onPress={ onPressHandler } />
        </Container>
    )
}

export default PodcastDetailsPage
