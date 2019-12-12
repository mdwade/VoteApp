import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import Login from './components/login' ;
import Loading from './components/loading' ;
import Main from './components/main' ;
import SignUp from './components/signup' ;  
import Soumission from './components/soumission';
import Sujet from './components/mes_sujets';



class App extends Component {
}

export default StackNavigator({
      Load : {
        screen : Loading
      },
      Log : {
          screen : Login
      },
      Sign : {
        screen : SignUp
      },
      main : {
        screen : Main
    },soumission : {
      screen : Soumission
    },profil : {
      screen : Sujet
    }

  },
  {
    initialRouteName : 'Load' , 
    
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3498db',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      header : null
    },
  },
  
)

const styles = StyleSheet.create({
  view : {
    flex : 1 ,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498db',
},
logo : {
  width : 100 , 
  height : 100
},
logoContainer : {
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
}
});
