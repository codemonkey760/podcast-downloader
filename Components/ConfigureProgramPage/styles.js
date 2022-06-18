import styled from '@emotion/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Picker } from '@react-native-picker/picker'

export const Container = styled.View`
  margin-top: 25px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: #595b68;
`

export const Form = styled(KeyboardAwareScrollView)`
  margin: 5px;
  border-radius: 5px;
  background-color: #bdc8d3;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const DetailHeader = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #d32415;
`

export const DetailTextInput = styled.TextInput`
  margin: 5px 25px 5px 25px;
  text-align: center;
  color: black;
  background-color: #eef5fb;
`

export const DetailPicker = styled(Picker)`
  margin: 5px 25px 5px 25px;
  background-color: #eef5fb;
`

export const DetailPickerItem = styled(Picker.Item)`
  
`

export const ButtonBox = styled.View`
  margin: 5px 25px 5px 25px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

export const Button = styled.Button`
  border-radius: 5px;
  margin: 5px;
  width: 100%;
  align-items: center;
`
