import React, {Component} from "react";
import 
{
    ActivityIndicator, 
    View,
    Text,
    StyleSheet,
    Image    
} 
from "react-native";
import firebase from 'react-native-firebase';

export default class Loading extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showME : true
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 6000);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? 'main' : 'Log')
        });
    }
    

    render() {
        return (
            <View style = {styles.container}>
                {
                    this.state.showME ?
                    < Image style = {styles.logo} source = {require('./images/review.png')}/>
                    :
                    <View>
                        <ActivityIndicator />
                    </View>
                }
                
                
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})