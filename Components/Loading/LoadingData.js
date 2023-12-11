import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing ,Text} from 'react-native';

const LoadingData = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 5000, // Dönme süresini artırın
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    // İlgili yerde bu animasyonun durması için kullanabilirsiniz.
    // Örneğin, verilerin çekilmesi tamamlandığında:
    // spinAnimation.stop();

    return () => {
      // Component unmount edildiğinde animasyonu durdurun
      spinAnimation.stop();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loading}>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../../img/kaplanLogo.png')}
          style={[styles.logo, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>
      <Text>Yükleniyor..</Text>
    </View>
  );
};

const styles = {
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
};

export default LoadingData;