import styled from '@emotion/native';

import Slider from '@react-native-community/slider'

export const PodcastListContainer = styled.View`
  margin-top: 25px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: #595b68;
`

export const PodcastCountContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #bdc8d3;
  max-height: 35px;
  margin: 10px 10px 0px 10px;
  border-radius: 5px;
  padding: 5px;
`

export const PodcastCount = styled.Text`
  margin-left: 5px;
  text-align: center;
`

export const PodcastCountSlider = styled(Slider)`
  height: 20px;
  width: 90%;
  margin: 0;
`

export const StyledPodcastScrollView = styled.ScrollView`
  
`;

export const RefreshHelperContainer = styled.View`
  margin: 5px;
  border-radius: 5px;
  background-color: #bdc8d3;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const RefreshHelperHeader = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #e3800f;
`

export const RefreshHelperText = styled.Text`
  margin-top: 10px;
  text-align: center;
  color: #0b0c10;
`