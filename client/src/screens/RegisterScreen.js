import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigation();
    const [isLoading, setIsLoading] = useState(false);


    const handleRegister = () => {
        setIsLoading(true);
        const user = {
            email: email,
            password: password,
        };
            
        // for debugging console.log('register user:', user );
        //send a post request to backend
        axios.post("http://localhost:3001/auth/register", user).then((res) => {
            
            setIsLoading(false);
            Alert.alert('registration successctful', 'bravo');
            setEmail('');
            setPassword('');
            

        }).catch((err) => {
            setIsLoading(false);
            if  (err.response) {
                Alert.alert('Registration failed', err.response.data.message);
            }
            else {
                console.log('Error message:', err.message);
                //console.log('Error stack:', err.stack);
                Alert.alert("registrtion failed", 'error occurred');
            }
        });
    };

    return (
        <SafeAreaView style={styles.layout}>
            <View>
                <Text style={styles.title}>Logo + Pancea</Text>
            </View>

            <View style={{ marginTop: 170 }}>
                <Text style={styles.title}>Register here </Text>
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
                            style={styles.textInput} 
                            />
                    </View>
                </View>


                <View style={{ marginTop: 10 }}>
                    { isLoading ? 
                    <ActivityIndicator  size="large" color="#0000ff"/> 
            
                    :
                    <Pressable
                        onPress={handleRegister}
                    >
                        <Text> register </Text>
                    </Pressable>}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Pressable
                        onPress={() => nav.navigate("Login")}
                    >
                        <Text> go to login </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen;

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