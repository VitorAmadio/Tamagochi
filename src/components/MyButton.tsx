import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
});

type ButtonProps ={
    title : string
    onPressButton: ()=>void
    containerStyle?:
}
const MyButton = ({title,onPressButton, color}:ButtonProps) => {
    return (
      <TouchableOpacity onPress={onPressButton}>
      <View style={{...styles.buttonContainer, backgroundColor: color}}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
    );
}

export default MyButton;
