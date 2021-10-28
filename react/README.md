# Attendi React sample

This repo contains a React Typescript sample app for using the Attendi Speech to Text API. The sample app was created using [Create React App](https://github.com/facebook/create-react-app).

## Getting started

In order to use our API, you will need a valid API key. To gain access to our API, you can contact us at <info@attendi.nl>.

After gaining access, update the .env file value REACT_APP_API_KEY with your Sandbox API key. Let's start the demo app:

```sh
npm install
npm start
```

Now you can record some audio, or upload an existing audio file.

### Uploading a audio file

We only support audio files that meet the following requirements:

- Single (mono) channel recording
- 16 kHz sampling rate
- 16-bit audio recording

## Documentation

API reference: <https://attendi.nl/api/>
