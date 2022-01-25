import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import Home from './components/Home';

import { Container } from "./styles/appStyles";

import AsyncStorage from '@react-native-async-storage/async-storage';

import AppLoading from 'expo-app-loading';

export default function App() {
  const [ready, setReady] = useState(false);

    const initialWorkRequired = []

    const [study, setStudy] = useState(initialWorkRequired);

    const LoadStudy = () => {
      AsyncStorage.getItem("storedStudy").then(data => {
        if (data !== null){
          setStudy(JSON.parse(data))
        }
      }).catch((error) => (console.log(error)));
    }

    if (!ready) {
      return(
        <AppLoading
          startAsync = {LoadStudy}
          onFinish = {() => setReady(true)}
          onError = {console.warn}
        />
      )
    }

    return (
      <Container>
        <Home 
          study = {study} 
          setStudy = {setStudy}
        />
        <StatusBar style="light" />
      </Container>
    );
}
