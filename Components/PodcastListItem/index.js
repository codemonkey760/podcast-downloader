import { TouchableOpacity } from 'react-native';

import {
    PodcastListItemView,
    PodcastIcon,
    PodcastTitle,
    DownloadBar,
    TitleAndPic
} from './styles';

function PodcastListItem({ id, imageUrl, title, downloadList, onPress }) {
    const progress = downloadList[id] ?? 0

    return (
        <TouchableOpacity key={id} onPress={onPress}>
            <PodcastListItemView>
                <TitleAndPic>
                    <PodcastIcon source={{uri: imageUrl}} alt={'podcast'} />
                    <PodcastTitle>{title}</PodcastTitle>
                </TitleAndPic>
                {(progress > 0) && (
                    <DownloadBar percent={progress} />
                )}
            </PodcastListItemView>
        </TouchableOpacity>
    );
}

export default PodcastListItem
