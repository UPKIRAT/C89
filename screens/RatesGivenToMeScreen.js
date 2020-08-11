import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';
import RateAnimation from '../components/Rate'

export default class RatesGivenToMeScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    this.notificationRef = db.collection("all_notifications")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          leftElement={<RateAnimation/>}
          title={item.message}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={item.rate1 + " , " + item.rate2 + " , " + item.rate3 + " , " + item.rate4 + " & " + item.rate5}
          bottomDivider
        />
      )
 }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Responses recieved"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>Rates Given To you</Text>
              </View>
            )
            :(
              <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allNotifications}
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
  container : {
    flex : 1
  },
  ModalButtons:{
    width:300,
    height:65,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:25,
    backgroundColor:'red',
    shadowColor: 'white',
    shadowOffset: {
       width: 0,
       height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    margin:5
},
buttonText:{
  color:'black',
  fontWeight:'200',
  fontSize:18,
  fontFamily: 'FredokaOne-Regular',
},
})
