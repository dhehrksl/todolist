import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import mainLoginStyles from './style/mainloginstyle';

const imageWidth = '100%';

const Inpage = ({ navigation }) => {
  return (
    <Swiper loop={false} showsButtons={true}>
      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>내 일정을 체크 할 수 있어요</Text>
        <Image source={require("../src/image/list1.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '70%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>일정을 추가 할 수 있어요</Text>
        <Image source={require("../src/image/list2.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '80%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>해당 일정 수정 삭제가 가능해요</Text>
        <Image source={require("../src/image/list3.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '70%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>달력으로 월별, 일별 일정 확인이 가능해요</Text>
        <Image source={require("../src/image/list4.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '70%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>전체 리스트, 완료 리스트, 미완료 리스트를 확인 할 수 있어요</Text>
        <Image source={require("../src/image/list5.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '70%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={mainLoginStyles.slide}>
        <Text style={mainLoginStyles.textStyle}>일정 및 세부내용을 검색 할 수 있어요</Text>
        <Image source={require("../src/image/list6.png")} style={[mainLoginStyles.image, { width: imageWidth, height: '70%' }]} resizeMode="contain" />
        <TouchableOpacity style={mainLoginStyles.startbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={mainLoginStyles.buttonText}>
            바로 시작하기
          </Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

export default Inpage;
