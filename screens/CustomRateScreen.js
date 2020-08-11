import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';
import { SearchBar, ListItem, Input } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";




export default class CustomRateScreen extends Component {

    state = {
      userId : firebase.auth().currentUser.email,
      category1:"",
      category2:"",
      category3:"",
      category4:"",
      category5:"",
      username:""
    }

    getDonorDetails=(userId)=>{
      db.collection("users").where("email_id","==", userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          this.setState({
            "username" : doc.data().user_name
          })
        });
      })
    }

    componentDidMount(){
      this.getDonorDetails(this.state.userId)
    }

    createUniqueId() {
      return Math.random().toString(36).substring(7);
    }
  
    addRequest = async (category1, category2, category3, category4, category5, username) => {
      var userId = this.state.userId;
      var randomRequestId = this.createUniqueId();  
  
      db.collection("rate_requests").add({
        user_id: userId,
        username:username,
        category1:category1,
        category2:category2,
        category3:category3,
        category4:category4,
        category5:category5,
        request_id: randomRequestId,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      this.setState({
        category1: "",
        category2: "",
        category3: "",
        category4: "",
        category5:"",
        requestId: randomRequestId,
      });
  
      return Alert.alert("Custom rate request sent Successfully");
    };

 render(){
    return(
        <View style = {styles.container}>
          <View>
            <MyHeader navigation={this.props.navigation} title = "Custom Rate"/>
          </View>

          <View style = {{margin:20, flexDirection:"column"}}>
            <TextInput
              style={styles.categoryInput}
              placeholder={"Custom Category 1"}
              maxLength={50}
              onChangeText={(text) => {
                this.setState({
                  category1: text,
                });
              }}
              value = {this.state.category1}
            />
            <TextInput
              style={styles.categoryInput}
              placeholder={"Custom Category 2"}
              maxLength={50}
              onChangeText={(text) => {
                this.setState({
                  category2: text,
                });
              }}
              value = {this.state.category2}
            />
            <TextInput
              style={styles.categoryInput}
              placeholder={"Custom Category 3"}
              maxLength={50}
              onChangeText={(text) => {
                this.setState({
                  category3: text,
                });
              }}
              value = {this.state.category3}
            />
            <TextInput
              style={styles.categoryInput}
              placeholder={"Custom Category 4"}
              maxLength={50}
              onChangeText={(text) => {
                this.setState({
                  category4: text,
                });
              }}
              value = {this.state.category4}
            />
            <TextInput
              style={styles.categoryInput}
              placeholder={"Custom Category 5"}
              maxLength={50}
              onChangeText={(text) => {
                this.setState({
                  category5: text,
                });
              }}
              value = {this.state.category5}
            />
          </View>

          <TouchableOpacity
            style={styles.ModalButtons}
            onPress={() => {
              this.addRequest(this.state.category1,this.state.category2,this.state.category3,this.state.category4,this.state.category5,this.state.username)         
            }}
          >
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>


          
        </View>          
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5CDB94'
  },
  categoryInput: {
    width: "100%",
    height: RFValue(45),
    paddingLeft: RFValue(12),
    borderLeftWidth:3,
    borderRadius:5,
    borderColor:"#05386B",
    alignSelf:"center",
    marginBottom:RFValue(20),
    fontFamily: 'FredokaOne-Regular',
    fontSize:22
  },
  buttonText:{
    color:'#5CDB94',
    fontWeight:'200',
    fontSize:23,
    fontFamily: 'FredokaOne-Regular',
  },
  ModalButtons:{
    width:180,
    height:65,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:25,
    backgroundColor:'#05386B',
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
  
})