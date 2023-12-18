import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Top from '../Components/Muhasebe/Top';
import Bottom from '../Components/Muhasebe/Bottom';
import Buttons from '../Components/Muhasebe/Buttons';
import Circular from '../Components/Muhasebe/Circular.js';
import { fetchIncome } from '../firebase';
import Header from '../Components/Header/Header'
export default function MuhasebeScreen() {
  const [income, setIncome] = useState([]);
  const [totalGelir, setTotalGelir] = useState(0);
  const [totalGider, setTotalGider] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Gelirleri çek
      await fetchIncome(setIncome);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Gelirlerde değişiklik olduğunda toplam fiyatları hesapla
    let gelir = 0;
    let gider = 0;
  
    income.forEach(item => {
      // item.fiyat'ı sayısal bir değere dönüştürerek toplama ekle
      const fiyat = parseFloat(item.fiyat);
  
      if (!isNaN(fiyat)) {
        if (item.durum === 'Gelir') {
          gelir += fiyat;
        } else if (item.durum === 'Gider') {
          gider += fiyat;
        }
      }
    });
  
    console.log('totalGelir:', gelir);
    console.log('totalGider:', gider);
  
    // Gelirleri ve Giderleri set et
    setTotalGelir(gelir);
    setTotalGider(gider);
  }, [income]);

  return (
    <View style={styles.container}>
      <Header/>
      <Top totalFiyat={totalGelir - totalGider} />
      <Buttons />
      <Bottom />
      <Circular totalGelir={totalGelir} totalGider={totalGider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    width:'100%',
    height:'100%'
  }
})