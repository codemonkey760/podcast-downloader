import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  max-height: 70px;
  height: 70px;
  flex: 1;
  flex-direction: column;
  background-color: #bdc8d3;
  margin: 10px 10px 0 10px;
  padding: 10px;
  border-radius: 15px;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

export const Icon = styled.Image`
  flex-grow: 1;
  width: 50px;
  height: 50px;
  flex-grow: 1;
`;

export const TouchableTitle = styled(TouchableOpacity)`
  width: 67%;
  height: 50px;
`

export const Title = styled.Text`
  text-align-vertical: center;
  text-align: center;
  color: #0b0c10;
`;

export const TouchableDetailsLink = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  background-color: #adb8c3;
  border-radius: 5px;
`

export const DetailsLink = styled.Text`
  font-size: 50px;
  text-align: center;
  font-family: serif;
`;

export const DownloadBar = styled.View`
  flex: 1;
  min-height: 6px;
  height: 6px;
  max-height: 6px;
  background-color: ${props => (props.percent === 100) ? '#3ca561' : '#858fa2'};
  border-radius: 3px;
  width: ${props => props.percent + '%'};
  position: relative;
  top: 8px;
`

export const FileNameText = styled.Text`
  color: #444;
  font-size: 8px;
  position: relative;
  top: 8px;
  text-align: center;
`
