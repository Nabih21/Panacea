import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const nav = useNavigation();
  return (
    <View style={styles.layout}>
        <Text>HomeScreen</Text>

        <View> 
                    <Pressable
                        onPress={() => nav.navigate("Login")}
                        >
                        <Text> go back to login </Text>
                    </Pressable>
        </View>
    </View>
    
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 70,
      },
})