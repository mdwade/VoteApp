import React , {Component} from 'react'; 
import {StyleSheet, Platform, Image, Text, View,FlatList} from 'react-native';
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
    
}
from 'native-base';

export default class Sujet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sujet : [],
        }
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

    
    componentWillMount(){
        const subject = this.state.sujet ;
        const {currentUser} = firebase.auth();
        this.setState({currentUser});
        firebase.database().ref("/Sujet/"+currentUser.uid).on('value' , (sujet)=>{
            if (sujet.val()) {
                this.setState({name : sujet.val().name}) ;
                sujet.forEach(element => {
                    subject.push({
                        desc : element.val().description,
                        titre : element.val().titre,
                        Date : element.val().Date
                    });
                this.setState({sujet : subject});
                });
            }
        });
    }

    render() {
        return (
            <Container>
                <Header style = {styles.headerColor} >
                    <Body>
                        <Title>Mes sujets</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='chatbubbles'/>
                        </Button>
                        <Button transparent onPress = {()=> this.props.navigation.navigate('soumission',{name : this.state.name})} >
                            <Icon name="color-filter"/>
                        </Button>
                        <Button transparent onPress = {()=> this.deconnexion()} >
                            <Icon name='close'  />
                        </Button>
                    </Right>
                </Header>
                <Content>
                <List dataArray={this.state.sujet}
                    renderRow={(item) =>
              <ListItem>
                
                    <Thumbnail  /> 
                        <Image source={require('./images/review1.png')} />
                    <Thumbnail />
                
                    <Text style={styles.desc}>{item.desc}</Text>  
              
              </ListItem>
            }>
          </List>
        </Content>
        <View style={styles.signupTextCont}>
            <Text style={styles.stc}>Copyright Box 4 Vote, © 2018</Text>
        </View>
            </Container>
                
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cont :{
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon : {
        color : "#ff4081",
        fontSize: 40,
    },
    unlike : {
        color : "#212121",
        fontSize: 40,
    },
    headerColor:{
        backgroundColor: '#00b894'
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
    desc:{
        marginLeft : 20,
        fontSize : 20
    }
})

