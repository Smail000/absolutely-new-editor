
# React + Parcel + Express base

Base for quick start beginning develop web application using React + Parcel (Frontend) and Express (Backend). You may replace Express on another technology.

# Modules
- FrontEnd: React, React Dom, Axios
- BackEnd: Express
- Tools: Nodemon, Cross-env
- Compiler: Parcel

# Features
- Live reload

# Installing

```
git clone https://github.com/Smail000/react-parcel-express-base.git
cd react-parcel-express-base
npm i
```

# Usage

Development mode (parcel base server) (will start server with live reload)
```
npm run front:dev
```
Or development mode without server, just compile every new save
```
npm run front:watch
```
Production mode
```
npm run front:build
```
In both cases all files will export into /build directory.

To run server script in development mode with hot reload (ctrl + s will work even from html files) type
```
npm run server:dev
```
And production mode
```
npm run server:build
```


