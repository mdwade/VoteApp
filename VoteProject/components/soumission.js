import React, {Component} from 'react';
import {StyleSheet, Platform, Image, Text, View , ToastAndroid} from 'react-native';
import {StackNavigator} from "react-navigation";
import firebase from 'react-native-firebase';
import
{
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    Content,
    Item,
    Input,
    Icon,
    Footer,
    FooterTab,
    Button,
    List,
    ListItem,
    Thumbnail,
    Badge,
    Form,
    Textarea
}
from 'native-base';

export default class Soumission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            description : '',
            currentUser : '',
            nameUser : '',
        }
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        this.setState({currentUser : currentUser.uid});
        this.setState({nameUser : currentUser.displayName});
    
    }

    deconnexion() {
        firebase
            .auth()
            .signOut()
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                alert(error);
            })
    }

    onValidate(){
        let {titre , description } = this.state ;
        var postData = {
            name : this.props.navigation.state.params.name,
            titre : titre , 
            description : description , 
            Date : new Date(),
            likes : 0 , 
            unlikes : 0,
        }
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/Sujet/' + this.state.currentUser + '/' + newPostKey] = postData;

        //return firebase.database().ref().update(updates);

        firebase.database().ref().update(updates)
        .then((success) => {
            this.setState({description : ""});
            ToastAndroid.show('Sujet envoyé', ToastAndroid.SHORT);
            this.props.navigation.navigate('main');
        })
        .catch((error) => {
            alert(error);
        })

    }

    

    render() {
        return (
            <Container>
                <Header style={styles.headerColor}>
                    <Body>
                        <Title>Poster un sujet</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress = {()=> this.props.navigation.navigate('profil',{name : this.state.name})}>
                            <Icon name='chatboxes'/>
                        </Button>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('soumission')}>
                            <Icon name="color-filter"/>
                        </Button>
                        <Button transparent onPress= {()=> this.deconnexion()}>
                            <Icon name='close'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item>
                        <Input style={styles.Inpt} placeholder='Titre' onChangeText = {(text) => this.setState({titre : text})} />
                    </Item>
                    <Content padder>
                        <Form>
                            <Icon active name='chatboxes'/>
                            <Textarea style={styles.textarea} rowSpan={8} bordered placeholder="Description" onChangeText = {(text)=>this.setState({description : text})} />
                        </Form>
                    </Content>
                    <Button block success 
                        style={styles.btn}
                        onPress = {
                            this.onValidate.bind(this)}>
                        <Text style={styles.txtBtn}>Valider</Text>
                    </Button>
                </Content>
                <View style={styles.signupTextCont}>
                    <Text style={styles.stc}>Copyright Box 4 Vote, © 2018</Text>
                </View>
            </Container>
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cont: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        color: "white",
        fontSize: 40
    },
    unlike: {
        color: "#212121",
        fontSize: 40
    },
    headerColor: {
        backgroundColor: '#00b894'
    },
    Inpt:{
        paddingLeft : 20,
        borderRadius : 15,
        backgroundColor:'white',
        marginHorizontal : 10,
        marginVertical : 20

    },
    btn : {
        backgroundColor : '#00b894',
        borderRadius : 25,
        marginHorizontal : 10,

    },
    textarea : {
        borderRadius : 15,
        backgroundColor : 'white',
        paddingLeft:20,
        paddingTop:20,
        marginVertical : 20
    },
    txtBtn : {
        color : 'white',
        fontSize : 20
    },
    signupTextCont:{
        justifyContent:'flex-end',
        alignItems:'center',
        marginVertical:10
    },
    stc :{
        fontSize:12,
        color: '#2c3e50'
    },
})