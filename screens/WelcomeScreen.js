import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import db from '../config';
import firebase from 'firebase';
import RateAnimation from '../components/Rate'
import StarsAnimation from '../components/RateStars'
import TickAnimation from '../components/TickAnimation'



export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId : '',
      password: '',
      modalVisible:false,
      address:'',
      first_name:'',
      last_name:'',
      mobile_number:'',
      user_name:'',
      widthValue:''
    };
  }

  //Function which logs in the user if his/her details exist
  userLogin = async (email, password)=>{
    if (email && password){
      try{
        const response = await firebase.auth().signInWithEmailAndPassword(email,password)
        if(response){
          this.props.navigation.navigate('RateScreen')
        }
      }
      catch(error){
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert("User dosen't exists")
            console.log("Doesn't exist")
            break
          case 'auth/invalid-email':
            Alert.alert('Incorrect email or password')
            console.log('invaild')
            break
        }
      }
    }
    else{
        Alert.alert('Enter email and password');
    }
  }

  //Function which makes a new account for the user
  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Addission Successfull")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }

  //Function which transfers the details of the user to the database
  createUser = async () => {
    db.collection("users").add({
      'address':this.state.address,
      'first_name':this.state.first_name,
      'last_name':this.state.last_name,
      'contact':this.state.mobile_number,
      'user_name':this.state.user_name,
      'email_id':this.state.emailId
    })
    this.setState({
      address:'',
      first_name:'',
      last_name:'',
      mobile_number:'',
      user_name:''
    })    
  }
  showModal = (visible)=>{
    this.setState({ modalVisible: visible });
  }
 

 render(){
  const { modalVisible } = this.state;
    return(
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed");
              }}
            >
              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.centeredView}
                scrollEnabled={true}
              >
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Fill in the required details</Text>

                  <TextInput
                    style={styles.signUpForm}
                    placeholder="Address"
                    placeholderTextColor = "#ADD8E6"
                    onChangeText={(text)=>{
                      this.setState({
                        address: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    placeholder="First Name"
                    placeholderTextColor = "#ADD8E6"
                    onChangeText={(text)=>{
                      this.setState({
                        first_name: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    placeholder="Last Name"
                    placeholderTextColor = "#ADD8E6"
                    onChangeText={(text)=>{
                      this.setState({
                        last_name: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    placeholder="Mobile Number"
                    placeholderTextColor = "#ADD8E6"
                    keyboardType ='numeric'
                    onChangeText={(text)=>{
                      this.setState({
                      mobile_number: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    placeholder="Username"
                    placeholderTextColor = "#ADD8E6"
                    onChangeText={(text)=>{
                      this.setState({
                        user_name: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    autoCapitalize="none"
                    placeholder="E-mail Id (example@barter.com)"
                    placeholderTextColor = "#ADD8E6"
                    keyboardType ='email-address'
                    onChangeText={(text)=>{
                      this.setState({
                        emailId: text
                      })
                    }}
                  />

                  <TextInput
                    style={styles.signUpForm}
                    secureTextEntry = {true}
                    placeholder="Password"
                    placeholderTextColor = "#ADD8E6"
                    onChangeText={(text)=>{
                      this.setState({
                        password: text
                      })
                    }}
                  />

                <View style = {{flexDirection:"row"}}>
                  <TouchableOpacity
                    style={styles.ModalButtons}
                    onPress={() => {
                      this.showModal(!modalVisible),
                      this.createUser();
                      this.userSignUp(this.state.emailId, this.state.password)
                    }}
                >
                    <Text style={styles.buttonText}>Create User</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.ModalButtons}
                    onPress={() => {
                      this.showModal(!modalVisible)
                    }}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>                
                </View>                    
                  

              </View>
            </KeyboardAwareScrollView>
        </Modal>

          <View style={{alignItems:"center", marginTop:20, flexDirection:'row', alignContent:"center", alignSelf:"center"}}>
            <Text style={styles.title}>RateNut</Text>
            <RateAnimation/>
          </View>
          <View style = {{alignSelf:"center"}}>
              <StarsAnimation/>
          </View>

          <View style={styles.buttonContainer}>
            <TextInput
            style={styles.loginBox}
            autoCapitalize="none"
            placeholder="example@ratenut.com"
            placeholderTextColor = "#f5f5f5"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />

          <TextInput
            style={styles.loginBox}
            secureTextEntry = {true}
            placeholder="Password"
            placeholderTextColor = "#f5f5f5"
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          />
          <View style = {{flexDirection:'column', marginTop:20}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:15}]}
              onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
              >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.showModal(true)}}
              >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5CDB94'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    textAlign:"center",
    textAlignVertical:"center",
    fontSize:55,
    fontWeight:'200',
    color:'white',
    fontFamily:'pacifico-regular'  
  },
  loginBox:{
    width: 300,
    height: 40,
    borderLeftWidth: 3,
    borderColor : '#05386B',
    fontSize: 23,
    fontFamily: 'FredokaOne-Regular',
    margin:10,
    paddingLeft:10,
    color:'white'
  },
  signUpForm:{
    width: 300,
    height: 40,
    borderLeftWidth: 3,
    borderColor : '#05386B',
    fontFamily: 'FredokaOne-Regular',
    fontSize: 16,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    backgroundColor:'#05386B',
    shadowColor: 'white',
    shadowOffset: {
       width: 0,
       height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#5CDB94',
    fontWeight:'200',
    fontSize:21,
    fontFamily: 'FredokaOne-Regular',
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
    marginTop:50
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 13,
    textAlign: "center",
    fontSize:26,
    color : '#210070',
    fontFamily: 'FredokaOne-Regular',
  },
  ModalButtons:{
      width:170,
      height:65,
      padding:20,
      justifyContent:'center',
      alignItems:'center',
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