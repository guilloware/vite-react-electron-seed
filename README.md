# Vite React TypeScript Electron Seed Project

This seed project provides a starting point for building applications with Vite, React, TypeScript, and Electron. It includes a basic setup with essential configurations to get you started quickly.

## Features

- **Vite** for fast and efficient development
- **React** for building user interfaces
- **TypeScript** for type-safe code
- **Electron** for cross-platform desktop applications
- **Embedded Node.js** server within Electron, eliminating the need for a separate server
- **Babel**: Used to avoid adding the `/** @jsxImportSource @emotion/react */` pragma at the top of every file.
- **Material-UI**: Integrated for UI components and styling.

## Project Structure

- **src/**: Source code for the React application
- **electron.sh**: Script to build and run the Electron application
- **main.ts**: Main Electron process file

## Scripts

- `dev`: Starts the Vite development server
- `build`: Builds the project for development
- `serve`: Serves the built project
- `electron`: Runs the Electron application
- `start`: Alias for `electron`
- `exe`: Builds the Electron application

## Usage

### Development

To start the development server with hot reloading:

    npm run dev

### Building

To build the project for production:

    npm run build

### Running the Electron App

To build and run the Electron application:

    npm run electron

Or simply:

    npm run start

### Packaging

To package the Electron application:

    npm run exe

## Embedded Node.js Server

This Electron application includes an embedded Node.js server, which serves the built files. You do not need to host a separate server for the HTML files.
