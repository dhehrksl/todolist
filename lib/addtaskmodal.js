import React from 'react';
import { View, Text, TextInput,ScrollView, TouchableOpacity, Modal } from 'react-native';
import todoListStyles from '../src/style/addmodalstyles';

const AddTaskModal = ({
    isModalVisible,
    newTask,
    additionalSmallTasks,
    handleText,
    smallTaskhandleText,
    addTask,
    onPressModalClose,
    selectedDate,
    setIsCalendarModalVisible,
}) => {
    return (
        <Modal
            animationType="slide"
            visible={isModalVisible}
            transparent={true}
        >
            <View style={todoListStyles.addModalView}>
                <TouchableOpacity onPress={() => {setIsCalendarModalVisible(true)}}>
                    <Text style={{ color: 'black', fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>{selectedDate}</Text>
                </TouchableOpacity>
                <ScrollView
                        contentContainerStyle={todoListStyles.scrollViewContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={todoListStyles.inputContainer}>
                <TextInput
                    style={todoListStyles.viewTaskText}
                    placeholder="일정 추가"
                    value={newTask}
                    multiline={true}
                    onChangeText={handleText}
                    onSubmitEditing={addTask}
                />
                <TextInput
                    style={todoListStyles.viewTaskText}
                    placeholder="세부 일정"
                    value={additionalSmallTasks}s
                    multiline={true}
                    onChangeText={smallTaskhandleText}
                    onSubmitEditing={addTask}
                />
                </View>
                </ScrollView>
                <View style={todoListStyles.modalBtn}>
                    <TouchableOpacity style={todoListStyles.modalBtnItem} onPress={addTask}>
                        <Text style={todoListStyles.addModalTitle}>추가</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={todoListStyles.modalBtnItem} onPress={onPressModalClose}>
                        <Text style={todoListStyles.addModalTitle}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddTaskModal;
