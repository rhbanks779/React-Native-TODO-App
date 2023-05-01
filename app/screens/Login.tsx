import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Button, StyleSheet, FlatList, TouchableOpacity, Text, TextInput } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const auth = getAuth();

    const signUp = async() => {
        const after = await createUserWithEmailAndPassword(auth, email, password);
        alert('Check your email');
    }

    const signIn = async() => {
        const user = await signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text:string) => setEmail(text)} value={email} />
            <TextInput style={styles.input} placeholder="Password" onChangeText={(text:string) => setPassword(text)} value={password} />
            <Button onPress={signUp} title='Create Account' />
            <Button onPress={signIn} title='Sign-In' />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 10,
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'lightblue'
    },
})

export default Login;