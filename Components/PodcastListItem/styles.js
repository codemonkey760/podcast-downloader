import styled from '@emotion/native';

export const PodcastListItemView = styled.View`
  max-height: 70px;
  height: 70px;
  flex: 1;
  flex-direction: column;
  background-color: #bdc8d3;
  margin: 10px 10px 0px 10px;
  padding: 10px;
  border-radius: 15px;
`;

export const TitleAndPic = styled.View`
  flex: 1;
  flex-direction: row;
`

export const PodcastIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

export const PodcastTitle = styled.Text`
  flex: 1;
  height: 50px;
  justify-content: center;
  text-align-vertical: center;
  text-align: center;
  color: #0b0c10;
`;

export const DownloadBar = styled.View`
  flex: 1;
  min-height: 6px;
  height: 6px;
  max-height: 6px;
  background-color: #858fa2;
  //background-color: #3ca561;
  border-radius: 3px;
  width: ${props => props.progressPercent + '%'};
  position: relative;
  top: 8px;
`
