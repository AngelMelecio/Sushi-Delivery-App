import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { q, onSnapshot, Timestamp } from '../../database/firebase-config'
import ChatMessage from '../components/ChatMessage'
import { chatQuery, chatsCollection, writeChat } from '../../database/backend'
import { useCasaMaki } from '../context/CasaMakiContext'
import CustomModal from '../components/CustomModal'

const OrderPage = ({ route, navigation }) => {

  const { user, activeOrder } = useCasaMaki()
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const ref = useRef(null)
  
  // Listen when the screen focus and check for the params passed
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        if(!activeOrder){
          setModalVisible(true)
        }
        ref.current.scrollToEnd({ animated: true })
    });
    return unsubscribe
  },[route])

  // Scroll to Bottom when a message is send
  useEffect(()=>{ 
    ref.current.scrollToEnd({ animated: true })
  },[chat])

  // Listen to any new message in Firestore                      
  useEffect(() => onSnapshot(chatsCollection(), (querySnapshot) => {
    querySnapshot.docChanges().map((change)=>{
      if( change.doc.id === user.email ){
          setChat( change.doc.data().messages )
      }
    }) 
  }), [])

  const onCloseModal = (callback) => { 
    setModalVisible(callback)
    navigation.goBack()
  }

  function toHour(time) {
    const current = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
    let minutes = current.getMinutes()
    return '' + current.getHours() + ":" + (minutes <= 9 ? '0' : '') + minutes
  }
  async function handleSendMessage() {
    if( message.length === 0 ) return 
    let email = user.email
    setMessage('')
    await writeChat(email, email, message)
  }

  return (
    <View style={{backgroundColor:COLORS.black, flex:1}}>
      <CustomModal
        visible={modalVisible}
        setVisible={onCloseModal}
        title={'ERROR'}
        message={'Te invitamos a realizar una compra'}
      />
      <ScrollView ref={ref} contentContainerStyle={styles.container} >
        {chat.length > 0 && chat.map((message, i) =>
          <ChatMessage
            key={i}
            text={message.text + ''}
            sender={message.sender}
            time={toHour(message.createdAt)}
          />
        )}
      </ScrollView>
      
      <View style={styles.bar}>
        <TextInput
          onChangeText={(t) => setMessage(t)}
          onFocus={()=>ref.current.scrollToEnd({ animated: true })}
          onBlur={()=>ref.current.scrollToEnd({ animated: true })}
          value={message}
          style={styles.input}
          selectionColor={COLORS.primary}
          placeholderTextColor={'#aaaaaa'}
          placeholder={'Mensaje'}
        />
        <TouchableOpacity style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Image
            style={styles.image}
            source={icons.send}
            resizeMode='cover'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderPage

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: COLORS.black,
    padding: SIZES.padding,
    paddingBottom: SIZES.width * 0.16,
    justifyContent: 'flex-end',
    //alignItems: 'flex-end',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    paddingVertical:5,
    height: SIZES.height * 0.08,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:COLORS.black,
  },
  input: {
    paddingVertical: SIZES.padding/1.5,
    paddingHorizontal: SIZES.padding * 2,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.height * 0.03,
    width: SIZES.width * 0.84,
    position: 'absolute',
    color: COLORS.white,
    left: 5,
  },
  sendButton: {
    position: 'absolute',
    right: 5,
    height: SIZES.height * 0.06,
    width: SIZES.height * 0.06,
    borderRadius: SIZES.height * 0.03,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: SIZES.height * 0.03,
    width: SIZES.height * 0.03,
    tintColor: COLORS.secondary,
    marginRight: 3,
  }
})