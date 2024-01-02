import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import buttonStyle from "../../Styles/ButtonStyle";
import ExpenseincomeList from "./ExpenseincomeList";
export default function Bottom() {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={[buttonStyle.normalButton,{marginRight:50,marginLeft:40}]}>Açıklama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={[buttonStyle.normalButton,{}]}>Tür</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={buttonStyle.normalButton}>Fiyat</Text>
        </TouchableOpacity>
      </View>
      <ExpenseincomeList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: "45%",
    borderWidth: 0.3,
    borderColor: "#E8E8D1",
    width:'100%'
  },
  buttons: {
    flexDirection: "row",
    height: "13%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  button: {
    marginHorizontal: 30,
  },
});
