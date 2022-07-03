import {
    Container,
    DetailBox,
    DetailHeader,
    DetailText,
    BackButton,
    PodcastIcon
} from './styles'

function PodcastDetailsPage({navigation, route}) {
    const onPressHandler = () => {
        navigation.pop()
    }

    const { podcastId, title, description, imageUrl, fileName } = route.params

    return (
        <Container>
            <DetailBox>
                <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                <DetailHeader>Podcast ID:</DetailHeader>
                <DetailText>{podcastId}</DetailText>
                <DetailHeader>Title:</DetailHeader>
                <DetailText>{title}</DetailText>
                <DetailHeader>File name:</DetailHeader>
                <DetailText>{fileName}</DetailText>
                <DetailHeader>Description:</DetailHeader>
                <DetailText>{description}</DetailText>
            </DetailBox>
            <BackButton title='Back' onPress={ onPressHandler } />
        </Container>
    )
}

export default PodcastDetailsPage
