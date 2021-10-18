import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";

const NotePreview = ({ note, navigation, deleteNote, editNote }) => {
    const handleDeleteButton = () => {
        Alert.alert(
            `Do you really want to delete note "${note.title}"?`,
            "",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => deleteNote(note),
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.noteContainer}>
                <View style={styles.noteName}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                        {(note.title)}
                    </Text>
                    <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
                        {(note.content)}
                    </Text>
                </View>
                <View style={styles.image}>
                    <Image source={{ uri: note.imageUri }} style={styles.image} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Open" onPress={() => navigation.navigate('Note', { note: note, editNote: editNote })} color="#f194ff" />
                <Button title="Delete" onPress={handleDeleteButton} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 3,
        backgroundColor: "#f8f8f8",
    },
    noteContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteName: {
        maxWidth: "75%"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    description: {
        marginTop: 5,
        fontSize: 12,
    },
    image: {
        width: 80,
        height: 80,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingLeft: 50,
        // paddingRight: 50,
    },
    button: {
        minHeight: 0
    }
});

export default NotePreview;