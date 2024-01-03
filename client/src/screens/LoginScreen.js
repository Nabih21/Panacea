import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    }
    axios.post("http://localhost:3001/auth/login", user).then(async (res) => {
      //console.log(res.data.message);
      const token = res.data.token;
      const message = res.data.message;
      if (token) {
        try {
          await AsyncStorage.setItem('authToken', token);
          nav.replace('Home');
        } catch (err) {
          console.error('AsyncStorage error:', err);
          // Handle storage error, perhaps notify the user or retry
        }
      } else {
        // Handle no token scenario (which should not occur if backend is consistent)
          if (message) {
            Alert.alert("Login issue", message);
          } else {
            Alert.alert("Login issue", "No token received and no message provided.");
          }
    }
}).catch((error) => {
    let errorMessage = "Invalid information"; // Default message
    if (error.response && error.response.data && error.response.data.message) {
        // Use the message from the backend if available
        errorMessage = error.response.data.message;
    } else {
        // Log and possibly handle network errors or other issues
        console.log('Error:', error);
    }
    Alert.alert("Login failed", errorMessage);
    });
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View>
        <Text style={styles.title}>Logo + Pancea</Text>
      </View>

      <View style={{ marginTop: 170 }}>
        <Text style={styles.title}>Log in to your Account </Text>
      </View>
      <KeyboardAvoidingView>
        <View>
          <View style={styles.textInputView}>
            <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput
              placeholder='Enter your email'
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View>
          <View style={styles.textInputView}>
            <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder='Enter your Password'
              style={styles.textInput} />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Pressable
            onPress={handleLogin}
          >
            <Text> Login </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 10 }}>
          <Pressable
            onPress={() => nav.navigate("Register")}
          >
            <Text> go to register </Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({

  layout: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#D0D0D0',
    borderRadius: 12,

  },
  textInput: {
    color: 'black',
    marginVertical: 10,
    width: 300,
    fontSize: 16,

  },

});