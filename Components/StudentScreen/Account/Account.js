import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Bmı from "./Bmı";
import TextStyle from "../../../Styles/TextStyle";
export default function Account({
  userData,
  satilanPaket,
  kalanDers,
  bitisTarihi,
}) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userData.name}</Text>
        </View>
        <View style={styles.info}>
          <Text style={TextStyle.normalText}>Email: {userData.email}</Text>
          <Text style={TextStyle.normalText}>Telefon: {userData.telefon}</Text>
          <Text style={TextStyle.normalText}>Boy : {userData.boy}</Text>
          <Text style={TextStyle.normalText}>Kilo: {userData.kilo}</Text>
          <Text style={TextStyle.normalText}>
            Toplam Ders: {userData.toplamDers}
          </Text>
        </View>
        <View style={styles.info}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Paket Bilgileri
          </Text>

          {satilanPaket && kalanDers && bitisTarihi ? (
            <>
              <Text style={TextStyle.normalText}>{satilanPaket}</Text>
              <Text style={TextStyle.normalText}>Kalan Ders: {kalanDers}</Text>
              <Text style={TextStyle.normalText}>Son kullanım tarihi </Text>
              <Text style={{ fontWeight: "bold", color: "red" }}>
                {bitisTarihi}
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 15, color: "red" }}>
              Paket bilgisi bulunamadı.
            </Text>
          )}
        </View>
        <View style={styles.endeksCont}>
          <Bmı height={userData.boy} weight={userData.kilo} />
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
    height: "95%",
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
