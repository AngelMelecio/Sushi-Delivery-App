import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { onSnapshot, Timestamp } from '../../database/firebase-config'
import ChatMessage from '../components/ChatMessage'
import { chatsCollection, writeChat } from '../../database/backend'
import { useCasaMaki } from '../context/CasaMakiContext'


const AdminChatPage = ({ route, navigation }) => {
  const status = [
    { id: 'Recivido', defaultMessage: 'Tu orden está ya siendo cocinada!!' },
    { id: 'Enviado', defaultMessage: 'El repartidor está en camino' },
    { id: 'Recoger', defaultMessage: 'Ya puedes pasar por tu orden!!' },
  ]

  const { user } = useCasaMaki()
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('')
  const [clientId, setClientId] = useState('null')


  const ref = useRef(null)

  useEffect(() => {
    let { item } = route.params
    setClientId(item?.user)
    setChat( item?.messages )
  }, [])

  // Scroll to Bottom when a message is send
  useEffect(() => {
    ref.current.scrollToEnd({ animated: true })
  }, [chat])

  // Listen to any new message in Firestore
  useEffect(() => onSnapshot( chatsCollection(), (querySnapshot) => {
    querySnapshot.docChanges().map((change)=>{
      if( change.doc.id === clientId ){
          setChat( change.doc.data().messages )
      }
    }) 
  }), [clientId])

  function toHour(time) {
    const current = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
    let minutes = current.getMinutes()
    return '' + current.getHours() + ":" + (minutes <= 9 ? '0' : '') + minutes
  }

  async function handleSendMessage() {
    if (message.length === 0) return
    let email = user.email
    let id = clientId
    setMessage('')
    await writeChat(email, id, message)
  }

  async function sendDefaultMessage(message, status) {
    let email = user.email
    let id = clientId
    await writeChat(email, id, message)
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=>{navigation.goBack()}}
          style={styles.back}>
          <Image
            source={icons.backArrow}
            resizeMode='cover'
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
    )
  }
  const renderStatus = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.defMes}
        onLongPress={() => sendDefaultMessage(item.defaultMessage)}
      >
        <Text>{item.id}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <Header />
      
      <ScrollView ref={ref} contentContainerStyle={styles.container} >
        {chat?.length > 0 && chat.map((message, i) =>
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
          onFocus={() => ref.current.scrollToEnd({ animated: true })}
          onBlur={() => ref.current.scrollToEnd({ animated: true })}
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
      <View style={styles.bar2}>
        <FlatList
          data={status}
          renderItem={renderStatus}
          horizontal
        />
      </View>
    </View>
  )
}

export default AdminChatPage

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: COLORS.black,
    padding: SIZES.padding,
    paddingBottom: SIZES.width * 0.32,
    justifyContent: 'flex-end',
    //alignItems: 'flex-end',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 5,
    height: SIZES.height * 0.08,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  bar2: {
    position: 'absolute',
    bottom: SIZES.height * 0.08,
    paddingVertical: 5,
    height: SIZES.height * 0.06,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  input: {
    paddingVertical: SIZES.padding / 1.5,
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
  },
  defMes: {
    paddingHorizontal: SIZES.padding * 2,
    marginHorizontal: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    height: SIZES.height * 0.025,
    width: SIZES.height * 0.025,
    tintColor: COLORS.secondary,
    marginRight: 3,
  },
  header: {
    width: '100%',
    height: SIZES.height * 0.05,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.height * 0.05,
    width: SIZES.height * 0.07,
  },
})