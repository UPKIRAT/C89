import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ScrollView } from 'react-native-gesture-handler';

export default class GoodDonate extends React.Component{

    constructor(){
        super()
        this.state = {
          userId  : firebase.auth().currentUser.email,
          requestedRatesList : []
        }
      this.requestRef= null
      }
    
      getrequestedRatesList =()=>{
        this.requestRef = db.collection("rate_requests")
        .onSnapshot((snapshot)=>{
          var requestedRatesList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedRatesList : requestedRatesList
          });
        })
      }
    
      componentDidMount(){
        this.getrequestedRatesList();
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
            <View style = {styles.list}>
                <ListItem
                    key={i}
                    title={item.username}
                    titleStyle={{ color: "#210070", fontWeight:"200", fontSize:20, marginBottom:5, marginTop:5,  fontFamily: 'FredokaOne-Regular',}}
                    rightElement={
                        <TouchableOpacity style={styles.button}
                        onPress ={()=>{
                          this.props.navigation.navigate("RecieverDetails",{"details": item})
                        }}
                        >
                        <Text style={{color:'#ffff', fontWeight:"200",   fontFamily: 'FredokaOne-Regular'}}>Rate!</Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                />
            </View>
        )
      }
    

    render(){
        return(<View style = {styles.container}>
                    <View>
                    <MyHeader title="Rate Screen" navigation ={this.props.navigation}/>
                    </View>
                    <View style={{flex:1}}>
                    {
                        this.state.requestedRatesList.length === 0
                        ?(
                        <View style={styles.subContainer}>
                            <Text style={styles.ButtonText}>List Of All Rates</Text>
                        </View>
                        )
                        :(
                        <FlatList
                        style = {styles.FlastItem}
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedRatesList}
                            renderItem={this.renderItem}
                        />
                        )
                    }
                    </View>
                    </View>
    )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:0.9,        
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color : '#40E0D0',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
        width:100,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#210070",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        margin:20
    },
    ButtonText:{
        color:'black',
        fontWeight:'200',
        fontSize:30,
        textAlign:"center",
        marginTop:50,
        fontFamily: 'FredokaOne-Regular',
    },
    list:{
        borderWidth:2,
        margin:12,
        borderColor:"#4C516D"
    }
  })