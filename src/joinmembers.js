import React, { useState } from 'react';
import { View, Text, TextInput, Pressable , Alert } from 'react-native';
import axios from 'axios';
import joinMemberStyles from "./style/joinmembersstyle";
import { URI_APIS } from '@env';

const apiUrl = URI_APIS



const Joinmembers = ({ navigation }) => { 
    const [email, setEmail] = useState('');//입력된 Email 상태
    const [password, setPassword] = useState('');// 입력된 Password 상태
    const [confirmPassword, setConfirmPassword] = useState('');//입력된 Password 상태
    const userData = '/user';//user 엔드포인트

    const validateEmail = (email) => { //유효성 검사
        const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regularExpression.test(email);
    };

    const handleSignUp = async() => {//회원가입
        if(email && password && confirmPassword){
            if(!validateEmail(email)){
                Alert.alert("이메일 형식으로 작성해주세요.");
                return;
            }else if(password !== confirmPassword){
                Alert.alert("비밀번호 확인을 체크해주세요");
                console.log('c');
                return;
            } else if(password.length < 4) {
                Alert.alert("비밀번호는 4자리 이상이어야 합니다.");
                return;
            }else if(email == password){
                Alert.alert("이메일과 비밀번호는 다르게 해주세요");
                return;
            }else{
                try{
                    response = await axios.get(`${apiUrl}/user/checkEmail?email=${email}`)//중복이메일을 DB에서 체크
                    if(response.data.exists){
                        Alert.alert("이미 존재하는 이메일입니다.");
                    }else{
                        await axios.post(`${apiUrl}${userData}`, {
                            email: email,
                            password: password
                        })
                        navigation.navigate('Login');
                    }
                }catch(err){
                    console.error('에러:', err);

                }
            }            
        }else{
            if (password !== confirmPassword) {
                Alert.alert("비밀번호와 비밀번호 확인이 다릅니다.");
                console.log('d');
                return;
            }else if(!email || !password && !email && !password){
                Alert.alert("아이디 또는 비밀번호를 입력해주세요");
                console.log('e');
                return;
            }else if(!email && password && confirmPassword){
                Alert.alert("이메일을 입력해주세요");
                console.log('f');
                return;
            }else if(email || !password && confirmPassword){
                Alert.alert("비밀번호를 입력해주세요");
                console.log('g');
                return; 
            }else if(email && password && !confirmPassword){
                Alert.alert("비밀번호 확인을 해주세요");
                console.log('h');
                return;
            }else{
                Alert.alert("다시 확인해주세요");
                return;
            }
        }  
    };


    return (
        <View style = {joinMemberStyles.container}>
            <TextInput style = {joinMemberStyles.input}
                placeholder="이메일"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput style = {joinMemberStyles.input}
                placeholder="비밀번호"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TextInput style = {joinMemberStyles.input}
                placeholder="비밀번호 확인"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
            />
            <Pressable style = {joinMemberStyles.loginbutton} onPress = {handleSignUp}>
                <Text style={joinMemberStyles.buttonText}>가입하기</Text>
            </Pressable>
        </View>
    );
};

export default Joinmembers;
