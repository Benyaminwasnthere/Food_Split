import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Sign Up</Text>
      {/* TODO: Add form fields similar to Login */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  back: { backgroundColor: '#3b82f6', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
});
