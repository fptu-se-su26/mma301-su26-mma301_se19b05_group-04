import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin đăng nhập.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.brandTitle}>Smart Rent</Text>
        <Text style={styles.brandSubtitle}>Tìm kiếm không gian sống lý tưởng của bạn</Text>
      </View>

      <View style={styles.formArea}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="example@gmail.com"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Mật khẩu</Text>
        <TextInput 
          style={styles.input} 
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  headerArea: { alignItems: 'center', marginBottom: 40, paddingHorizontal: 24 },
  brandTitle: { fontSize: 36, fontWeight: 'bold', color: '#1E3A8A', letterSpacing: 1 },
  brandSubtitle: { fontSize: 14, color: '#64748B', marginTop: 8, textAlign: 'center' },
  formArea: { paddingHorizontal: 24 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, fontSize: 16, color: '#0F172A' },
  loginButton: { backgroundColor: '#0ea5e9', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 32, shadowColor: '#0ea5e9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#64748B', fontSize: 14 },
  signUpLink: { color: '#0ea5e9', fontSize: 14, fontWeight: 'bold' }
});