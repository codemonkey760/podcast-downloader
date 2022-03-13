import React from 'react'
import {Button} from "react-native";
import {Alert} from 'react-native';

export default function DownloadOneJKButton() {
    const onPressHandler = () => {
        Alert.alert(
            undefined,
            "Download was successful",
            [
                {
                    "text": "OK"
                }
            ]
        );
    };

    return (
        <Button
            title={"Download latest JK podcast"}
            onPress={onPressHandler}
        />
    )
}