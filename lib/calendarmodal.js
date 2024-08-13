import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import todoListStyles from '../src/style/calendarmodalstyles';

const CalendarModal = ({ isCalendarModalVisible, handleDayPress, handleMonthPress, onPressCalendarModalClose, onPressCalendarMonthAddModal, setIsCalendarModalVisible, calendarMonthAddButtonDisappear }) => {
    return (
        <Modal
            animationType="slide"
            visible={isCalendarModalVisible}
            transparent={true}
            onRequestClose={() => setIsCalendarModalVisible(false)}
        >
            <View style={todoListStyles.addModalView}>
                <Calendar
                    onDayPress={handleDayPress}
                    onMonthChange={handleMonthPress}
                />
                <View style={todoListStyles.addModalViews}>
                    {!calendarMonthAddButtonDisappear ? (
                        <TouchableOpacity style={todoListStyles.modalBtnItem} onPress={onPressCalendarMonthAddModal}>
                            <Text style={todoListStyles.addModalTitle}>월 선택</Text>
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity style={todoListStyles.modalBtnItem} onPress={onPressCalendarModalClose}>
                        <Text style={todoListStyles.addModalTitle}>닫기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CalendarModal;
