import React from 'react';
import {StyleSheet, Platform, Image, Text, View, FlatList} from 'react-native';
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
    Ionicons
}
from 'native-base';
import moment from 'moment';
import 'moment/locale/fr'

moment.locale('fr');

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            subjects : [], 
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
        const {currentUser} = firebase.auth() ; 
        const name = currentUser.displayName ; 
        this.setState({name}) ;
    }

    increaseVote(index,key,like){
        const post = firebase.database().ref('posts/'+key) ; 
        post.update({ likes : like+1 });
    }

    decreaseVote(index,key,unlike){
        const post = firebase.database().ref('posts/'+key) ; 
        post.update({ unlikes : unlike+1 });
    }


    componentDidMount() {
        const sujets = firebase.database().ref('posts');
        sujets.on('value',(snapshot)=>{
            const data = snapshot.val() ;
            
            if (data === null) {
                return array = []
            }
            let array = [] ;
            for (const key of Object.keys(data)) {
                    let value = data[key];
                    value.id = key
                    array.push(value) ; 
            }

            subjectSorter = (a, b) => {
                return (a.likes < b.likes) ? 1 : (b.likes < a.likes ? -1 : 0);
            }

            array.sort(subjectSorter);
            this.setState({subjects : array});
        })
    }

    render() {
        const {subjects} = this.state;
        return (

            <Container>
                <Header style={styles.headerColor}>
                    <Body>
                        <Icon name='person' style={styles.icn}/>
                        <Title>{this.state.name}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('profil',{name : this.state.name})}>
                            <Icon name='chatbubbles'/>
                        </Button>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('soumission',{name : this.state.name})}>
                            <Icon name="color-filter"/>
                        </Button>
                        <Button transparent onPress= {()=> this.deconnexion()}>
                            <Icon name='close'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List dataArray = {subjects} 
                            renderRow = {(item , sectionId , rowId)=> 
                                <ListItem avatar > 
                        <Left>
                            <Thumbnail source={require('./images/vot.png')} /> 
                        </Left>
                        <Body>
                            
                            <Text style ={styles.title}>{item.titre}</Text>
                            <Text style={styles.name} > <Icon name='person'/> {item.name}</Text>
                            <Text note style ={styles.desc}>{item.description}</Text>
                            <Text note  style ={styles.Date}>publié le {moment(item.Date).format('dddd')} à {moment(item.Date).format(' h:mm:ss a')}  </Text>
                        </Body>
                        <Right style={styles.cont}>
                            <Button transparent badge vertical  >
                            <Badge style={{ backgroundColor: 'red' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>{item.likes}</Text></Badge>
                            <Icon name = 'heart' style ={styles.icon} onPress = {()=> this.increaseVote(rowId , item.id ,item.likes)} />
                            </Button>
                            <Button transparent badge vertical  >
                            <Badge style={{ backgroundColor: '#212121' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>{item.unlikes}</Text></Badge>
                            <Icon name = 'trash' style ={styles.unlike}  onPress = {()=> this.decreaseVote(rowId , item.id ,item.unlikes)} />
                            </Button>
                        </Right>
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
    
    Date : {
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    name : {
        fontSize: 22,
        fontWeight: 'bold',
    }, 
    title : {
        fontSize: 22,
        fontWeight: 'bold',
        color : '#263238',
    },
    desc : {
        fontSize: 15,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cont: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        color: "red",
        fontSize: 20
    },
    icn: {
        color: "white",
        fontSize: 30
    },
    unlike: {
        color: "#212121",
        fontSize: 20
    },
    headerColor: {
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
})
