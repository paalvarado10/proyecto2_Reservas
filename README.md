# Reservas el campincito

[![NPM Version](https://img.shields.io/npm/v/reactstrap.svg?branch=master)](https://www.npmjs.com/package/reactstrap)

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Running

Make sure to add a `config.js` file in the `config` folder. See the example there for more details.

##Warning cases
in case there is a problem with bcrypt, then do the following:
npm install -g node-gyp
npm install --g --production windows-build-tools

and then isntall
npm install bcrypt

or change it to bcryptjs

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
##Page
https://limitless-waters-44501.herokuapp.com/
