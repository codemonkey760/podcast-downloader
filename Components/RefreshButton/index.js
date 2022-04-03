import React from 'react';

import { StyledButton } from './styles'

export default function RefreshButton({onPress}) {
    return (
        <StyledButton
            onPress={onPress}
            title='Refresh Podcast List'
        />
    );
}