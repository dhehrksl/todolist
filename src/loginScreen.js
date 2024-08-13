import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert } from 'react-native';
import axios from 'axios';
import mainLoginStyles from './style/mainloginstyle';
import { URI_APIS } from '@env';

const apiUrl = URI_APIS;
console.log("URI_APISURI_APIS",apiUrl);

const LoginScreen = ({ navigation, setEmailState, setTasks }) => {
  const [userEmail, setUserEmail] = useState('');//유저 이메일 상태
  const [password, setPassword] = useState('');//유저 패스워드 상태
  const [signInEnabled, setSignInEnabled] = useState(false);//로그인 활성화 버튼

  const handleLogin = async () => {//로그인
    if (!userEmail || !validateEmail(userEmail)) {
      Alert.alert("올바른 이메일을 입력해주세요");
    } else if (!password) {
      Alert.alert("비밀번호를 입력해주세요");
    } else {
      try {
        await axios.post(`${apiUrl}/login`, { email: userEmail, password: password });
        console.log('로그인 성공');
        setEmailState(userEmail);
        const taskResponse = await axios.get(`${apiUrl}/todolist?email=${userEmail}`);
        setTasks(taskResponse.data);
        navigation.navigate('Todo');
      } catch (error) {
        console.error('로그인 실패:', error);
        Alert.alert("이메일과 비밀번호를 확인해주세요");
      }
    }
    setUserEmail('');
    setPassword('');
    setSignInEnabled(false);
  };

  const validateEmail = (email) => {//유효성 검사
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const inputChange = (text, field) => {
    if (field === 'email') {
      setUserEmail(text);
    } else if (field === 'password') {
      setPassword(text);
    }
    setSignInEnabled(userEmail.trim() !== '' && password.trim() !== '');
  };

  return (
    <View style={mainLoginStyles.container}>
      <TextInput
        style={mainLoginStyles.input}
        placeholder="이메일"
        onChangeText={(text) => inputChange(text, 'email')}
        value={userEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={mainLoginStyles.input}
        placeholder="비밀번호"
        onChangeText={(text) => inputChange(text, 'password')}
        value={password}
        secureTextEntry={true}
      />
      <Pressable
        style={[mainLoginStyles.loginbutton, signInEnabled ? null : { backgroundColor: 'gray' }]}
        onPress={signInEnabled ? handleLogin : null}
        disabled={!signInEnabled}
      >
        <Text style={mainLoginStyles.buttonText}>로그인</Text>
      </Pressable>
      <Pressable style={mainLoginStyles.loginbutton} onPress={() => navigation.navigate('Join')}>
        <Text style={mainLoginStyles.buttonText}>회원가입</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
