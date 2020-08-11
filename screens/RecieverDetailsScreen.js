import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";


export default class RecieverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      category1: "",
      category2: "",
      category3: "",
      category4: "",
      category5: "",
      userName        : "",
      recieverId      : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      recieverRequestDocId : '',
      value1:"",
      value2:"",
      value3:"",
      value4:"",
      value5:"",
      new_name:""
    }
  }

  getRecieverDetails(){
    db.collection('rate_requests').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          userName    : doc.data().username,
          category1    : doc.data().category1,
          category2    : doc.data().category2,
          category3    : doc.data().category3,
          category4    : doc.data().category4,
          category5    : doc.data().category5,
          recieverRequestDocId:doc.id
          
        })
      })
    });
}


addNotification = () => {
  var message =
    this.state.new_name + " has rated on the following categories";
  db.collection("all_notifications").add({
    targeted_user_id: this.state.recieverId,
    donor_id: this.state.userId,
    request_id: this.state.requestId,
    rate1:this.state.category1 + ": " + this.state.value1,
    rate2:this.state.category2 + ": " + this.state.value2,
    rate3:this.state.category3 + ": " + this.state.value3,
    rate4:this.state.category4 + ": " + this.state.value4,
    rate5:this.state.category5 + ": " + this.state.value5,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    notification_status: "unread",
    message: message,
  });
};

addRate = () => {
  var message =
    "You recently rated " + this.state.userName + " on the following categories";
  db.collection("all_given_rates").add({
    targeted_user_id: this.state.recieverId,
    donor_id: this.state.userId,
    request_id: this.state.requestId,
    rate1:this.state.category1 + ": " + this.state.value1,
    rate2:this.state.category2 + ": " + this.state.value2,
    rate3:this.state.category3 + ": " + this.state.value3,
    rate4:this.state.category4 + ": " + this.state.value4,
    rate5:this.state.category5 + ": " + this.state.value5,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    message: message,
  });
};


  // getUserDetails=(userId)=>{
  //   db.collection("users").where('email_ID','==', userId).get()
  //   .then((snapshot)=>{
  //     snapshot.forEach((doc) => {
  //       this.setState({
  //         userName  :doc.data().first_name + " " + doc.data().last_name
  //       })
  //     })
  //   })
  // }


  componentDidMount(){
    this.getRecieverDetails()
    // this.getUserDetails(this.state.userId)
  }


    render(){
      return(
        <ScrollView>
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#5CDB94'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Details", style: { color: '#5CDB94', fontSize:26, fontFamily:'pacifico-regular' } }}
              backgroundColor = "#05386B"
            />
          </View>
          <View style={{flex:0.45,}}>
            <Card
                title={"Rate on a scale of 0 to 9"}
                titleStyle= {{fontSize : 22, fontFamily:"FredokaOne-Regular"}}
              >
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"FredokaOne-Regular"}}>{this.state.category1}</Text>
                <TextInput
                  style={styles.valueInput}
                  placeholder={"0-9"}
                  maxLength={1}
                  keyboardType ='numeric'
                  onChangeText={(text) => {
                    this.setState({
                      value1: text,
                    });
                  }}
                  value = {this.state.value1}
                />
                </View>
              </Card>
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"FredokaOne-Regular"}}>{this.state.category2}</Text>
                <TextInput
                  style={styles.valueInput}
                  keyboardType ='numeric'
                  placeholder={"0-9"}
                  maxLength={1}
                  onChangeText={(text) => {
                    this.setState({
                      value2: text,
                    });
                  }}
                  value = {this.state.value2}
                />
                </View>
              </Card>
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"FredokaOne-Regular"}}>{this.state.category3}</Text>
                <TextInput
                  style={styles.valueInput}
                  placeholder={"0-9"}
                  maxLength={1}
                  keyboardType ='numeric'
                  onChangeText={(text) => {
                    this.setState({
                      value3: text,
                    });
                  }}
                  value = {this.state.value3}
                />
                </View>
              </Card>
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"FredokaOne-Regular"}}>{this.state.category4}</Text>
                <TextInput
                  style={styles.valueInput}
                  placeholder={"0-9"}
                  maxLength={1}
                  keyboardType ='numeric'
                  onChangeText={(text) => {
                    this.setState({
                      value4: text,
                    });
                  }}
                  value = {this.state.value4}
                />
                </View>
              </Card>
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"FredokaOne-Regular"}}>{this.state.category5}</Text>
                <TextInput
                  style={styles.valueInput}
                  placeholder={"0-9"}
                  maxLength={1}
                  keyboardType ='numeric'
                  onChangeText={(text) => {
                    this.setState({
                      value5: text,
                    });
                  }}
                  value = {this.state.value5}
                />
                </View>
              </Card>
              <Card>
                <View style = {{flexDirection:"row", alignItems:"center"}}>
                <TextInput
                  style={styles.nameInput}
                  placeholder={"Who's it from?"}
                  maxLength={25}
                  onChangeText={(text) => {
                    this.setState({
                      new_name: text,
                    });
                  }}
                  value = {this.state.new_name}
                />
                </View>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.addNotification()
                      this.addRate()
                      this.props.navigation.navigate('MyRatesScreen')
                    }}>
                  <Text style={{color:'#5CDB94', fontFamily: 'FredokaOne-Regular',}}>I am done</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
        </ScrollView>
        
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#5CDB94"
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 20,
    backgroundColor: '#05386B',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16,
    margin:20
  },
  valueInput: {
    width: "30%",
    height: RFValue(40),
    borderWidth:1.2,
    borderRadius:20,
    borderColor:"#05386B",
    alignSelf:"center",
    marginLeft:"5%",
    fontFamily: 'FredokaOne-Regular',
    fontSize:15,
    textAlign:"center"
  },
  nameInput: {
    width: "90%",
    height: RFValue(50),
    borderBottomWidth:2,
    borderRadius:20,
    borderColor:"#05386B",
    alignSelf:"center",
    marginLeft:"5%",
    fontFamily: 'FredokaOne-Regular',
    fontSize:18,
    textAlign:"center"
  },
})
