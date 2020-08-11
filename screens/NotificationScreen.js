import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';
import RateAnimation from '../components/Rate'
import { SwipeListView } from 'react-native-swipe-list-view';


export default class NotificationScreen extends Component{
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
    .where("notification_status", "==", "unread")
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

  updateMarkAsread =(notification)=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
      "notification_status" : "read"
    })
  }


  onSwipeValueChange = swipeData => {
    var allNotifications = this.state.allNotifications
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex(item => item.key === key);
        this.updateMarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({allNotifications : newData})
    };
};

  renderItem = data => (
        <ListItem
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          title={data.item.message}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.rate1 + ", " + data.item.rate2 + ", " + data.item.rate3 + ", " + data.item.rate4 + ", " + data.item.rate5}
          bottomDivider
        />
  );

  renderHiddenItem = () => (
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Text style={styles.backTextWhite}></Text>
          </View>
      </View>
  );


  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

 render(){
    return(
      <View style={styles.container}>
          <SwipeListView
              disableRightSwipe
              data={this.state.allNotifications}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  ModalButtons:{
    width:70,
    height:45,
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
  fontSize:12,
  fontFamily: 'FredokaOne-Regular',
},
container: {
  backgroundColor: 'white',
  flex: 1,
},
backTextWhite: {
  color: '#FFF',
  fontWeight:'bold',
  fontSize:15
},
rowBack: {
  alignItems: 'center',
  backgroundColor: '#29b6f6',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
},
backRightBtn: {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 100,
},
backRightBtnRight: {
  backgroundColor: '#29b6f6',
  right: 0,
},


})
