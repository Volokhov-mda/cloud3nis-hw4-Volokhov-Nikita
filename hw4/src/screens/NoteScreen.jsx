import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { connect } from "react-redux";
import { editNote } from "../redux/actions";

const NoteScreen = ({ editNote, route, navigation }) => {
    const { note } = route.params;
    const [isEditMode, setIsEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);
    const [newUriImage, setNewUriImage] = useState(note.imageUri);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setNewUriImage(result.uri);
        }
    };

    let toggleEditMode = () => {
        if (isEditMode) {
            editNote({
                id: note.id,
                imageUri: newUriImage,
                title: newTitle,
                content: newContent,
            });
        }

        setIsEditMode(!isEditMode);
    }


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => { toggleEditMode() }} title={!isEditMode ? "Edit" : "Save"} />
            ),
        });
    }, [isEditMode, newTitle, newContent, newUriImage]);

    return (
        <View style={styles.container}>
            {!isEditMode ? (
                <>
                    <Text style={styles.title}>
                        {newTitle}
                    </Text>
                    <Text style={styles.content}>
                        {newContent}
                    </Text>
                    <Image source={{ uri: newUriImage }} style={styles.image} />
                </>
            ) : (
                <>
                    <TextInput style={{ ...styles.title, ...styles.editTextInput }} value={newTitle} onChangeText={setNewTitle} placeholder="Change the title..." />
                    <TextInput style={{ ...styles.content, ...styles.editTextInput }} value={newContent} onChangeText={setNewContent} placeholder="Change the content..." />
                    {newUriImage ? <Image source={{ uri: newUriImage }} style={styles.image} /> : null}
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                </>
            )}
        </View>);
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
    },
    content: {
        marginTop: 5,
        fontSize: 15,
    },
    image: {
        alignSelf: "center",
        marginTop: 10,
        aspectRatio: 1,
        width: "100%",
    },
    editTextInput: {
        color: "#707070",
        textDecorationLine: "underline"
    }
});

const mapDispatchToProps = {
    editNote,
};

export default connect(null, mapDispatchToProps)(NoteScreen);