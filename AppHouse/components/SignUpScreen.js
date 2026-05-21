import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (name && email && password) {
      Alert.alert('Thành công', 'Tài khoản của bạn đã được khởi tạo.', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
      ]);
    } else {
      Alert.alert('Lỗi', 'Vui lòng hoàn thiện tất cả các trường dữ liệu.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>
        <Text style={styles.headerTitle}>Tạo Tài Khoản</Text>
        <Text style={styles.headerSubtitle}>Trở thành thành viên của cộng đồng Smart Rent</Text>

        <Text style={styles.inputLabel}>Họ và tên</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nguyễn Ngọc Bửu"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="your_email@gmail.com"
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

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginLink}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  formArea: { paddingHorizontal: 24 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: '#64748B', marginBottom: 24 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, fontSize: 16, color: '#0F172A' },
  button: { backgroundColor: '#0ea5e9', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 32 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#64748B', fontSize: 14 },
  loginLink: { color: '#0ea5e9', fontSize: 14, fontWeight: 'bold' }
});