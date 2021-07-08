#TOTP Authentication using NestJS

This is a sample project for JWT and TOTP (Two-Factor Authentication)

## What you will need

 * NodeJS 12+
 * TOTP Authenticator (Microsoft Authenticator or Google Authenticator)

## What you won't need

 * Database environment, this application is based on an in-memory user storage

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Swagger test site:

http://localhost:3000/docs

### Important notes:

* Passwords are stored in plain text. DO NOT DO THIS IN A REAL APPLICATION.
* JWT Secreats are stored in sourcefile in this project. DO NOT DO THIS IN A REAL APPLICATION.

### Test Workflow:

* ```auth/login```: Log in with user ```testuser``` with password ```12345```. Do not provide any key for Two-Factor Authentication. Use the returned JWT key for authorization.
* ```auth/register-2fa```: Call this endpoint to obtain the QR Code. It will be downloaded
* Read the QR Code into Google Authenticator / Microsoft Authenticator
* ```auth/validate-2fa-key```: Try to validate the generated code.
* ```auth/login```: Log in with user ```testuser``` with password ```12345``` again. It's going to fail unless you provide the Two-Factor Key.
