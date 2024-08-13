import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import todoListStyles from '../src/style/viewtaskmodalstyles';
import CheckBoxed from 'expo-checkbox';

const ViewTaskModal = ({
    isViewModalVisible,
    viewDate,
    editTaskText,
    additionalSmallTasks,
    insideCheckBoxData,
    setEditTaskText,
    setAdditionalSmallTasks,
    setInsideCheckBoxData,
    onPressEditTask,
    selectDeleteTask,
    onPressModalClose,
    setIsCalendarModalVisible,
    selectedDate
}) => {
    
    const toggleCheckBox = () => {
        setInsideCheckBoxData(!insideCheckBoxData);
    };

    return (
        <Modal
            animationType="slide"
            visible={isViewModalVisible}
            transparent={true}
        >
            {viewDate ? (
                <View style={todoListStyles.modalView}>
                    <TouchableOpacity onPress={() => setIsCalendarModalVisible(true)}>
                        <Text style={todoListStyles.dateText}>{selectedDate}</Text>
                    </TouchableOpacity>
                    <View style={todoListStyles.checkboxContainer}>
                        <CheckBoxed
                            value={!insideCheckBoxData}
                            onValueChange={toggleCheckBox}
                            color={'#4630EB'}
                        />
                    </View>
                    <ScrollView
                        contentContainerStyle={todoListStyles.scrollViewContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={todoListStyles.inputContainer}>
                            <TextInput
                                style={todoListStyles.viewTaskText}
                                multiline={true}
                                onChangeText={text => setEditTaskText(text)}
                                placeholder="일정 입력"
                                value={editTaskText}
                            />
                            <TextInput
                                onChangeText={text => setAdditionalSmallTasks(text)}
                                placeholder="추가 일정 입력"
                                style={todoListStyles.smallTaskText}
                                multiline={true}
                                value={additionalSmallTasks}
                            />
                        </View>
                    </ScrollView>
                    <View style={todoListStyles.modalBtn}>
                        <TouchableOpacity onPress={onPressEditTask}>
                            <Text style={todoListStyles.addModalTitle}>수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectDeleteTask}>
                            <Text style={todoListStyles.addModalTitle}>삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressModalClose}>
                            <Text style={todoListStyles.addModalTitle}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </Modal>
    );
};

export default ViewTaskModal;
