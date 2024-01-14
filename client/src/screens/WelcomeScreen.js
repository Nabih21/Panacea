import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import welcomeMeme from '../../../assets/images/welcome_meme.jpeg'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  
  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.layout}>
        <View  >
        <Text style={styles.title}>Welcome Screen</Text>
        </View>

        <View style={styles.containerImage} >
            <Image 
            source={welcomeMeme}
            style={styles.image}
             /> 
        </View>
        <View style={styles.buttonContainer}>
        <Pressable
            onPress={() => nav.navigate("Register")}
            style={styles.button}
            >
              
            <Text style={styles.buttonText}> Sign up </Text>
                      </Pressable>
        
          <Pressable
            onPress={() => nav.navigate("Login")}
            style={[styles.button, {backgroundColor: 'white', borderWidth: 1, borderColor: 'green'}]}
            >

            <Text style={[styles.buttonText, { color: 'green'}]}> Sign in</Text>
                      </Pressable>
         </View>
    </SafeAreaView>    
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

    layout: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 30,
        // padding: 24
      },
      title: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      }, 
      containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: 'white', // Shadow needs a color to stand out
        // Add padding to prevent the shadow from being clipped, kinda opitonal
        padding: 0,
        borderRadius:12,
        margin: 10,
      },
      image: {
        width: 300,
        height: 400,
        borderWidth: 0,
        borderRadius: 12,
        borderColor: '#E7E3EB',
        
      },

      buttonContainer : {
        padding: 16, 
        margin: 20,
     
      },
      button: {
        padding: 10,
        borderWidth:0,
        margin: 12, 
        width: 300,
        height: 45,
        backgroundColor: 'green',
        borderRadius: 8,


      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
        //fontFamily: 'calibri',
        fontSize: 18,
        fontWeight:'600',
        
      },
      
      
})