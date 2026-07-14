import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../../../theme/colors';

export const HomeBanner = () => (
  <View style={styles.wrap}>
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800' }} style={styles.bg} imageStyle={{ borderRadius: 18 }}>
      <View style={styles.overlay}>
        <Text style={styles.t1}>Khám phá Ngũ Hành Sơn</Text>
        <Text style={styles.t2}>Hành trình di sản văn hóa và thiên nhiên kỳ vĩ</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, marginTop: 12, height: 180 },
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 18, padding: 20, justifyContent: 'flex-end' },
  t1: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  t2: { color: colors.white, fontSize: 13, marginTop: 4 },
});
