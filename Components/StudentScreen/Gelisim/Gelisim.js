import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextStyle from "../../../Styles/TextStyle";
import GList from "./GList";
export default function Gelisim({ id }) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Gelişim</Text>
        </View>
        <View style={styles.info}>
         <GList id={id}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",

    borderBottomEndRadius: 30,
  },
  endeksCont: {
    marginTop: 60,
    height: "auto",
    width: "100%",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  info: {
    height: "85%",
    width: "100%",
    justifyContent: "start",
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  textContainer: {
    height: "30%",
    padding: 30,

    borderTopLeftRadius: 90,
    alignItems: "center",
    justifyContent: "start",
  },
  kkText: {
    color: "black",
    fontSize: 15,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: "#E8E8D1",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 50,
    marginTop: 18,
    borderColor: "black",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
