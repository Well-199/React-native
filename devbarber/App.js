import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import { io } from 'socket.io-client'

const App = () => {

  const socketRef = useRef()

  const [text, setText] = useState('')
  const [message, setMessage] = useState([])

  const sendMessage = () => {

	if(text!==''){

		let messages = {message: text, rest: false, id: Math.random() * 1000}

		socketRef.current.emit('sendAtt', messages)
		setMessage([...message, messages])
		setText('')

	}

  }

  // fazer um post no banco salvar a mensagem e retornar em um array
  console.log('Message: ', message.length)

  useEffect(() => {

	// PRODUÇÃO http://52.67.82.164:3000/
    // TESTES http://54.159.228.240:4000/
    // LOCAL http://192.168.3.3:4000/

    socketRef.current = io('http://54.159.228.240:4000/', { query: { match: 67 }})

	socketRef.current.on('attOrders', (data) => {
		setMessage([...message, data])
		console.log(data)
	})
	return () => {
		socketRef.current.disconnect()
	}

	// socketRef.current.on('connect', data => {
	// 	console.log("connect: ", data)
	// })
	
	// socketRef.current.on('attOrders', data => {
	// 	console.log("attOrders: ", data)
	// })
	
	// socketRef.current.on('canceledMessage', data => {
	// 	console.log("canceledMessage: ", data)
	// })
	
	// socketRef.current.on('receivedMessage', data => {
	// 	console.log("receivedMessage ", data)
	// })
	
	// socketRef.current.on('receivedOrder', data => {
	// 	console.log("receivedOrder: ", data)
	// })
	
	// socketRef.current.on('disconnect', data => {
	// 	console.log("disconnect: ", data)
	// })
    
  }, [message])

  return(
    <View style={styles.container}>
		
		<View >
			<FlatList
				data={message}
				keyExtractor={(item) => item.id}
				renderItem={({item}) => 

				<View style={styles.chats}>
					<Text style={item.rest === false ? styles.rest : styles.user}>
						{item.message}
					</Text>
				</View>
				}
			/>
		</View>

		<View style={styles.divInput}>
			<TextInput
				style={styles.input}
				placeholder="Digite sua mensagem"
				onChangeText={(text) => setText(text)}
				value={text}
			/>

			<TouchableOpacity onPress={sendMessage}>	
				<Image
					style={styles.tinyLogo}
					source={require('./assets/send.png')}
				/>
			</TouchableOpacity>
		</View>
	
	</View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
	justifyContent: 'flex-end',
  },

  chats: {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
  },

  rest: {
	display: 'flex',
	alignSelf: 'flex-end',
	maxWidth: 290,
	fontWeight: 'bold',
	fontSize: 12,
	lineHeight: 18,
	backgroundColor: '#D7232C',
	borderTopLeftRadius: 16,
	borderTopRightRadius: 16,
	borderBottomLeftRadius: 16,
	padding: 12,
	color: '#FFFFFF',
	marginRight: 20,
	marginBottom: 20
  },

  user: {
	fontWeight: 'bold',
	fontSize: 12,
	lineHeight: 18,
	padding: 12,
	maxWidth: 290,
	color: '#2D2D2D',
	borderTopLeftRadius: 16,
	borderTopRightRadius: 16,
	borderBottomRightRadius: 16,
	backgroundColor: '#EEEEEE',
	borderTopStartRadius: 12,
	marginLeft: 20,
	marginBottom: 20
  },

  divInput: {
	display: 'flex',
	borderTopWidth: 1,
	flexDirection: 'row',
	borderTopColor: '#CCC',
	backgroundColor: '#FFF',
	justifyContent: 'space-between'
  },

  input: {
	width: '80%',
    height: 40,
    margin: 12,
    padding: 10
  },

  tinyLogo: {
    width: 50,
    height: 50,
	marginTop: 10,
	marginRight: 10
  },

})

export default App