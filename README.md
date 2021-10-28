# Attendi Sample apps

This repo contains sample apps for using the Attendi Speech to Text service. Some apps will show you how to use all API's from your server, while other apps will show how a frontend application can use our Transcribe endpoint. 

## Getting started

In order to use our API, you will need two API keys, a public key for the React App, and a private key for the .NET Console app. Please contact us at info@attendi.nl.

### Public keys

Public keys are used to identify your tenant to the API, and are not secret. This means that you can use the publishable key in your Javascript frontend, or in a mobile application. 

Public keys can only use the Transcribe endpoint. 

### Private keys

Private keys should be kept confidential and you should only store them in your servers. You must not share your private API key with any third parties. The private API key should be treated like a password.

Private keys can use all our APIs. 

## Sample Apps

### React Typescript

Update the .env with your public API key by replacing <YOUR_PUBLIC_API_KEY\> with your **public** key.

### .NET 5 Console app

Update the code at line 13 in Program.cs, replace <YOUR_PRIVATE_API_KEY\> with your **private** API key