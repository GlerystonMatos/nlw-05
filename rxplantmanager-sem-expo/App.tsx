import Routes from './src/routes';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)
  });

  return (
    <Routes />
  );
};

export default App;