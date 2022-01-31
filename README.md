# Music together

## Development

This project consists of a frontend and a backend.

The frontend is written in react native, the backend is written in Flask (python).

To test your project you need expo installed as a global npm dependency and as the app on your mobile device.

```shell
npm install --global expo-cli
```

Then you can build your frontend via

```shell
expo start
```

You then get a QR code, you can scan with your expo App on your phone.

Make sure your backend is serving at the same Port as the 
`axios.defaults.baseURL` line in App.tsx. You can just change the line depending on your local ip.