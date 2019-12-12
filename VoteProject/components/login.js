import React, {Component} from 'react';
import
{
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ImageBackground,
    StatusBar
}
from 'react-native';
import firebase from 'react-native-firebase';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

   

    componentDidMount() {
        GoogleSignin
            .configure({})
            .then(() => {
                // you can now call currentUserAsync()
                GoogleSignin
                    .currentUserAsync()
                    .then((user) => {
                        console.log(user);
                    })
                    .done();
            });
    }

    connexion() {
        const email = this.state.email;
        const password = this.state.password;
        
        firebase
            .auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                alert(error);
            })
    }

    googleConnexion = () => {
        GoogleSignin
            .signIn()
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase
                    .auth
                    .GoogleAuthProvider
                    .credential(data.idToken, data.accessToken);
                // login with credential
                return firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential);
            })
            .then(() => {
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                alert(error);
            })
    }

    facebookLogin = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('User cancelled request')); // Handle this however fits the flow of your app
                }

                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase
                    .auth
                    .FacebookAuthProvider
                    .credential(data.accessToken);

                // login with credential
                return firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential);
            })
            .then(() => {
                this.props.navigation.navigate('main');
                console.info(JSON.stringify(currentUser.user.toJSON()))
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        return (
            <ImageBackground source={require('./images/bg4.jpg')} style={styl.backgroundImage}>
                < StatusBar backgroundColor= "#00b894" / >
            <View style={styl.container}>
                <View style = {styl.view}>
                <Image style = {styl.logo}  source={require('./images/review.png')} />
                <Text style={styl.txte}>Bienvenue sur B4V</Text>
                
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

                <TouchableOpacity
                    placeholderTextColor="rg"
                    style={styl.buttonContainer}
                    onPress={this
                    .connexion
                    .bind(this)}>
                    <Text style={styl.buttonText}>
                        Connexion</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styl.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Sign')}>
                    <Text style={styl.buttonText}>
                        Inscription
                    </Text>
                </TouchableOpacity>
                
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={(error, result) => {
                    if (error) {
                        alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        alert("login is cancelled.");
                    } else {
                        AccessToken
                            .getCurrentAccessToken()
                            .then((data) => {
                                alert(data.accessToken.toString())
                            })
                    }
                }}
                    onLogoutFinished={() => alert("logout.")}
                    style={styl.buttonContainerFb}/>

                <GoogleSigninButton
                    style={styl.buttonContainerFb}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this
                    .googleConnexion
                    .bind(this)}/>
                </View>
                <View style={styl.signupTextCont}>
                    <Text style={styl.stc}>Copyright Box 4 Vote, © 2018-</Text>
                </View>
                </View>
            </ImageBackground>
        )
    };
}

const styl = StyleSheet.create({
    container: {
    },
    view : {
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 10,
        marginBottom: 20,
        width : 300,
        borderRadius: 25,
    },
    buttonContainerFb: {
        paddingVertical: 20,
        marginBottom: 20,
        width : 300,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    txt: {
        paddingHorizontal: 10,
        color: '#FFF',
        width : 300,
        marginBottom: 30,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25,
        paddingLeft: 20,
    },
    txte: {
        color: 'rgba(255,255,255,0.7)',
        marginVertical: -10,
        textAlign: 'center',
        fontSize: 20,
        marginBottom:25
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
        marginTop: 40,
        marginBottom: 20,
    },
    backgroundImage:{
        flex: 1,
    },
    signupTextCont:{
        flexGrow:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginVertical:16
    },
    stc :{
        color: 'rgba(255,255,255,0.4)',
        fontSize:14
    }
})
