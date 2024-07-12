import React from 'react';
import { IconButton } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import styled from '@emotion/styled';
import { colors } from '@theme';

const DebugButtonIcon = styled(BugReportIcon)`
    color: ${colors.debugRed} !important;
    font-size: 2.5rem !important;
    position: fixed;
    right: 20px;
    bottom: 20px;
    color: ${colors.debugRed} !important;
`;

const DebugButton: React.FC = () => {
    const isElectron = !!window.electron;
    const isDevMode = !window.electron.isPackaged;

    console.log(`Is electron app: {isElectron}`);
    console.log(`Is dev mode: {isDevMode}`);

    const openDevTools = () => {
        if (isElectron && isDevMode) {
            window.electron.send('open-devtools');
        }
    };

    if (!isElectron || !isDevMode) {
        return null;
    }

    return (
        <IconButton onClick={openDevTools}>
            <p>{isDevMode}</p>
            <DebugButtonIcon />
        </IconButton>
    );
};

export default DebugButton;
