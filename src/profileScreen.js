import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profilestyle from './style/profilestyle';

const ProfileScreen = ({ userEmailState }) => {
  const navigation = useNavigation();

  const handleLogout = () => {//로그아웃
    navigation.navigate('Login');
    
  };

  return (
    <View style={profilestyle.container}>
      <Text style={profilestyle.titleStyle}>로그인된 아이디</Text>
      <Text style={profilestyle.email}>{userEmailState}</Text>
      <Button
        title="로그아웃"
        onPress={handleLogout}
      />
    </View>
  );
};


export default ProfileScreen;
