import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, firestore } from "../firebase";
import { fetchPackageInfo } from "../firebase";
import Account from "../Components/StudentScreen/Account/Account";
import LoadingData from "../Components/Loading/LoadingData";
import ButtonContainer from "../Components/StudentScreen/Account/ButtonContainer";
import ILesson from "../Components/StudentScreen//Derslerim/ILesson";

import { useNavigation } from "@react-navigation/native";
import Ayarlar from "../Components/StudentScreen/Ayarlar";
import Gelisim from "../Components/StudentScreen/Gelisim/Gelisim";
import Rezerv from "../Components/StudentScreen/Rezerv";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [packageInfo, setPackageInfo] = useState(null);

  const [showSetting, setshowSetting] = useState(false);
  const [showDerslerim, setShowDerslerim] = useState(false);
  const [showAccount, setshowAccount] = useState(true);
  const [gelisim, setGelisim] = useState(false);
  const [rezerv, setRezerv] = useState(false);

  const navigation = useNavigation();
  const user = auth.currentUser;
  const userId = user.uid;
  console.log("ID:", userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userRef = firestore.collection("userss").doc(userId);
          const selectedStudentSnapshot = await firestore
            .collection("userss")
            .where("id", "==", userId)
            .get();
  
          if (selectedStudentSnapshot.docs.length === 0) {
            console.log("Öğrencinin belgesi bulunmamaktadır.");
            setUserData(null);
            setPackageInfo(null);
            return;
          }
  
          const selectedStudent = selectedStudentSnapshot.docs[0];
  
          // userData ayarla
          const doc = await userRef.get();
          if (doc.exists) {
            const newUserData = doc.data();
  
            // Manipülasyonlar burada yapılabilir
  
            setUserData(newUserData);
          } else {
            console.log("Firestore belgesi bulunamadı");
          }
  
          // packageInfo'yu ayarla
          fetchPackageInfo(selectedStudent, setPackageInfo);
        } else {
          setUserData(null);
          setPackageInfo(null);
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
        setUserData(null);
        setPackageInfo(null);
      }
    };
  
    fetchData();
  }, [userId, setUserData, setPackageInfo]);

  if (!userData) {
    return <LoadingData />;
  }
  if (packageInfo === null) {
    // Package bilgisi yüklenmediyse gerekli durumları burada ele alabilirsiniz.
  }

  return (
    <View style={styles.KullaniciContainer}>
      <View style={styles.leftContainer}>
        <ButtonContainer
          showSetting={showSetting}
          showDerslerim={showDerslerim}
          showAccount={showAccount}
          gelisim={gelisim}
          rezerv={rezerv}
          navigation={navigation}
          setShowDerslerim={() => {
            setshowAccount(false);
            setShowDerslerim(true);
            setshowSetting(false);
            setGelisim(false);
            setRezerv(false);
          }}
          setshowAccount={() => {
            setshowAccount(true);
            setShowDerslerim(false);
            setshowSetting(false);
            setGelisim(false);
            setRezerv(false);
          }}
          setshowSetting={() => {
            setshowAccount(false);
            setShowDerslerim(false);
            setshowSetting(true);
            setGelisim(false);
            setRezerv(false);
          }}
          setGelisim={() => {
            setshowAccount(false);
            setShowDerslerim(false);
            setshowSetting(false);
            setGelisim(true);
            setRezerv(false);
          }}
          setRezerv={() => {
            setshowAccount(false);
            setShowDerslerim(false);
            setshowSetting(false);
            setGelisim(false);
            setRezerv(true);
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        {showAccount && (
          <Account
            userData={userData}
            satilanPaket={packageInfo ? packageInfo.SatilanPaket : null}
            kalanDers={packageInfo ? packageInfo.KalanDers : null}
            bitisTarihi={packageInfo ? packageInfo.paketBitisTarihi : null}
          />
        )}
        {showDerslerim && <ILesson id={userId} />}
        {showSetting && <Ayarlar />}
        {gelisim && <Gelisim id={userId} />}
        {rezerv && <Rezerv />}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  KullaniciContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 2,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    
  
  },
});
