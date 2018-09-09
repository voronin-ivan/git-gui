# git-gui

[![Maintainability](https://api.codeclimate.com/v1/badges/1eab2756148786296270/maintainability)](https://codeclimate.com/github/voronin-ivan/git-gui/maintainability)
[![Build Status](https://travis-ci.org/voronin-ivan/git-gui.svg?branch=master)](https://travis-ci.org/voronin-ivan/git-gui)

## GUI for your repositories
### [Demo](https://git-gui.herokuapp.com)
Node.js app for display git branches, commits and files.  
Supported all text-formats like `.html`, `.js`, `.md` and etc (with highlighting code syntax).  
Just change value of `displayRepo` in package.json and let`s hack!  

### Install
```sh
npm install
```

### Development
```sh
npm run dev
```

### Build
```sh
npm run build
```

## Testing
### Mocha
```sh
npm run mocha
```
### Hermione
```sh
npm start
npm run selenium
npm run hermione
```

Update expected screens
```sh
npm run hermione-update
```

All reports will be available after run in dir `coverage`.

## CI/CD
After push in remote branch will start checks on [travis](https://travis-ci.org/) (linters, tests, build). After the successful completion of checks and creating pr, changes will be deployed on testing-stand on [heroku](https://heroku.com/) with Docker.

### Envs
- [stage](https://git-gui-stage.herokuapp.com) (actual master)
- [production](https://git-gui.herokuapp.com)

___


Made in [Yandex Development School](https://academy.yandex.ru/events/frontend/shri_msk-2018/) with ♥
