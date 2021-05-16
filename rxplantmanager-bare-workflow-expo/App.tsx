import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [hideAppLoading, setHideAppLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideAppLoading(true);
    }, 250);
  }, [])

  if (!hideAppLoading) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}