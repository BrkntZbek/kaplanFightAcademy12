import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import İnputStyle from "../../Styles/İnputStyle"
import Header from "../Header/Header"
import { addBlog } from '../../firebase'

export default function AddBlogPage() {
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const Blog = () => {
        addBlog(title, contents)
        console.log(`${title} adlı blog eklendi`);
    }

    return (
        <View style={styles.addBlogContainer}>
            <Header />
            <Text style={{ fontSize: 20 }}>Blog Ekle</Text>
            <View style={styles.addBlogContent}>
                <TextInput
                    placeholder='Başlık'
                    value={title}
                    onChangeText={setTitle}
                    style={İnputStyle.loginİnput}
                />
                <TextInput
                    placeholder='İçerik'
                    value={contents}
                    onChangeText={setContents} // <-- Burayı onChangeText olarak değiştir
                    style={İnputStyle.loginİnput}
                />
            </View>
            <TouchableOpacity onPress={Blog}>
                <Text>Ekle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addBlogContainer:{
        flex:1,
        alignItems:'center',
        marginBottom:20
    },
    addBlogContent:{
        width:'80%',
      
    }
})