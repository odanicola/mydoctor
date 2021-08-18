# My Doctor Chat App
A simple chat app between a doctor and a patient using React Native, NodeJs + SocketIO, and Golang+MongoDB

# Screenshots
## Patient 
![alt text](https://github.com/odanicola/mydoctor/blob/1.0.1/public/assets/patient-1.jpg?raw=true)

# installation
## react-native 
This app is using React Native as the front-end 

```
yarn install
```

### Run the metro
```
yarn start
```
### Build the app
### note: This is still in development under Android environtment

```
yarn android
```
### note: make your sure you have at least two emulators of android to run this app as doctor and patient

## socket.io & nodejs
This app is using socket.io and nodejs to handle the listeners

```
yarn install
```

### Run the socket & service in dev mode
```
yarn server
```

### golang & mongodb
This app is using Golang and MongoDB to save the messages
### note: make sure you have installed mongoDB on your computer / laptop

### Run the app
```
go run main.go
```

