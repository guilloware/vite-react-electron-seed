import React from 'react';
import { Global, css } from '@emotion/react';
import DebugButton from "@/components/DebugButton/DebugButton";

const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        background-color: #faf3ea;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #root {
        height: 100%;
        width: 100%;
    }
`;

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const headerStyle = css`
    height: 50px;
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const contentStyle = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const welcomeStyle = css`
    font-size: 2rem;
    color: #333;
`;

const App: React.FC = () => {
    return (
        <>
            <Global styles={globalStyles} />
            <div css={containerStyle}>
                <header css={headerStyle}>
                    <h1>Welcome to the Seed Project</h1>
                </header>
                <div css={contentStyle}>
                    <p css={welcomeStyle}>Kickstart your project with Vite, React, TypeScript, and Electron!</p>
                </div>
                <DebugButton />
            </div>
        </>
    );
};

export default App;
