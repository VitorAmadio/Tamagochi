import React = require("react");
import { StyleSheet, Text, View } from "react-native";

type props={
    textProps: string
} 
const MeuComponente = ({textProps}:props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#f00",
            alignItems: "center",

        },
        text:{
            color: "#000000",
            fontSize:20
        }
    })
    return (
        <View style={styles.container}>
            <Text>{textProps}</Text>
        </View>
    );
}

export default MeuComponente;