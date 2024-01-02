import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { muhasebe } from '../../firebase';

export default function ExpenseincomeList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    muhasebe(setData);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={{width:240}}>
        <Text style={styles.text}>{item.aciklama}</Text> 
        </View>
      
        <Text style={[styles.text, { color: item.durum === 'Gelir' ? 'green' : 'red' }]}>
        {item.durum}
      </Text>
      <Text style={styles.text}>{formatCurrency(item.fiyat)}</Text>
    </View>
  );
  const formatCurrency = (value) => {
    return value.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
    
  },
  text:{
    color:'#E8E8D1',
     marginRight:30,
     width:'auto',fontWeight:'bold'
  },
  itemContainer: {
    borderBottomWidth: 1,
    flexDirection:'row',
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
});