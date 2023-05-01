import { addDoc, collection, deleteDoc, doc, onSnapshot, snapshotEqual, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";
import { FIRESTORE_DB } from "../../firebaseConfig";
import {Ionicons, Entypo} from '@expo/vector-icons'

export interface Todo {
    title: string,
    done: boolean,
    id: string,
}

export default function List({navigation} : any ) {

    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState<any>('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos')  //reference to the db
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setTodos(todos)
            }
        })
        return () => subscriber();  //to get rid of the subscription
    }, [])

   const addTodo = async() => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo, done: false}) //adds data to db
        setTodo("")
    };

    const renderTodo = ({item} : any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)   //access 1 doc, 2nd argument add the path
        const toggleDone = async() => {
            updateDoc(ref, {done: !item.done})  //setting done 
        }

        const deleteItem = async() => {
            deleteDoc(ref)  //all that is needed to delete item-ref points to 1 specific item
        }

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done ? (
                        <Ionicons name='md-checkmark-circle' size={24} color='green' />) : (
                        <Entypo name='circle' size={24} color='black'/>)}
                    <Text style={styles.todoText}>{item.title}</Text>
              </TouchableOpacity>  
              <Ionicons name='trash-bin-outline' size={24} color='red' onPress={deleteItem} />
            </View>
            
        )
    }

    return (
        <View style={styles.container}>
         <View style={styles.form}>
          <Button onPress={() => navigation.navigate('Details')} title="open details" />
           <TextInput style={styles.input} placeholder="Add new todo" 
            onChangeText={(text:string) => setTodo(text)}
            value={todo}/>
          <Button onPress={() => addTodo} title="Add todo" disabled={todo === ''} />
         </View>
         {todos.length > 0 && (
        //  <View>
        //     {todos.map(todo => (
        //         <Text key={todo.id}>{todo.title}</Text>
        //     ))}
        //  </View>)}
         <View>
            <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={todo => todo.id}
            />
         </View>
         )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'lightblue'
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 4,
    }, 
    todoText: {
        flex:1,
        paddingHorizontal: 4,
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

