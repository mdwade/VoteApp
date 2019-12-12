import React, {Component} from "react";
import
{
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
}
from "react-native";
import firebase from 'react-native-firebase';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username : ''
        }
    }

    inscrire() {
        const email = this.state.email;
        const password = this.state.password;
        const userN = this.state.username ;

        firebase
            .auth()
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.database().ref(`Sujet/${user.user.uid}`).set({name: userN});
                user.user.displayName = userN ;
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                console.log('erreur' + error);
                alert(error);
            });
    }

    render() {
        return (
            <View style={styl.container}>
                <View style = {styl.view}>
                <Image style = {styl.logo}  source={require('./images/review.png')} />
                        <Text style={styl.txte}>Inscrivez-vous</Text>

                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styl.txt}
                            placeholder=" Email "
                            keyboardType="email-address"
                            onChangeText=
                            {(text) => this.setState({ email : text })}/>

                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styl.txt}
                            placeholder=" Mot de passe "
                            secureTextEntry={true}
                            onChangeText=
                            {(text) => this.setState({ password : text })}/>

                            <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styl.txt}
                            placeholder="Username"
                            secureTextEntry={true}
                            onChangeText=
                            {(text) => this.setState({ username : text })}/>

                        <TouchableOpacity
                            style={styl.buttonContainer}
                            onPress={this
                            .inscrire
                            .bind(this)}>
                            <Text style={styl.buttonText}>
                                Inscription
                            </Text>
                        </TouchableOpacity>
                </View>
                 <View style={styl.signupTextCont}>
                    <Text style={styl.stc}>Copyright Box 4 Vote, © 2018</Text>
                </View>
            </View>
        )
    };
}

const styl = StyleSheet.create({
    container: {
        backgroundColor:"#00b894" ,
        flex:1,
    },
    view : {
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: "#16a085",
        paddingVertical: 10,
        marginBottom: 10,
        width : 300,
        borderRadius: 25
    },
    buttonContainerFb: {
        paddingVertical: 20,
        marginBottom: 10,
        width : 300
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    txt: {
        paddingHorizontal: 10,
        color: '#FFF',
        width : 300,
        marginBottom: 20,
        paddingLeft: 20,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25
    },
    txte: {
        color: 'rgba(255,255,255,0.7)',
        marginVertical: -10,
        textAlign: 'center',
        fontSize: 20,
        marginBottom:60
    },
    signupTextCont:{
        flexGrow:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginVertical:16
    },
    stc :{
        color: 'rgba(255,255,255,0.4)',
        fontSize:12
    },
    viewButton: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo : {
        width : 100 , 
        height : 100,
        marginTop: 50,
        marginBottom: 20,
    },
})