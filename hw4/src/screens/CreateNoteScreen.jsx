import React, { useState } from "react";
import { Button, TextInput, View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const CreateNoteScreen = ({ route, navigation }) => {
    const { handleCreateNote } = route.params;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUri, setImageUri] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    const onPressCreate = () => {
        if (title.length === 0) {
            Alert.alert(
                `You can't create note without a title`,
                "",
                [
                    {
                        text: "OK"
                    }
                ]
            );

            return;
        }
        handleCreateNote({
            id: Date.now(),
            imageUri: imageUri,
            title: title,
            content: content,
        });
        navigation.goBack();
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
                headerRight: () => (
                <Button onPress={onPressCreate} title="Create" />
            ),
        });
    }, [navigation, title, content, imageUri]);

    return (
        <View style={styles.containter}>
            <TextInput style={styles.title} value={title} onChangeText={setTitle} placeholder="Write the title..." />
            <TextInput style={styles.content} value={content} onChangeText={setContent} placeholder="Write the content..." />
            {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    containter: {
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
});

export default CreateNoteScreen;