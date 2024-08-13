import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import todoListStyles from '../src/style/taskitem';

const TaskItem = ({ item, dateToSave, currentDate, outToggleTask, openViewModal }) => {
    return (
        <View>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{dateToSave}</Text>
            {item.tasks.map(task => {
                const isCheckedValue = Boolean(task.isChecked);
                const isTaskPast = task.date < currentDate;
                let taskTextStyle = { color: 'black' };

                if (isTaskPast) {
                    taskTextStyle = isCheckedValue
                        ? { color: 'black', textDecorationLine: 'line-through' }
                        : { color: 'red' };
                } else {
                    taskTextStyle = isCheckedValue
                        ? { color: 'black', textDecorationLine: 'line-through' }
                        : { color: 'black' };
                }

                return (
                    <View key={task.id} style={todoListStyles.item}>
                        <CheckBox
                            style={todoListStyles.checkbox}
                            value={isCheckedValue}
                            onValueChange={() => outToggleTask(task)}
                            color={'#4630EB'}
                        />
                        <TouchableOpacity onPress={() => openViewModal(task)} style={{ flex: 1 }}>
                            <View style={todoListStyles.viewTaskText}>
                                <Text style={[todoListStyles.taskText, taskTextStyle]} numberOfLines={2}>
                                    {task.task}
                                </Text>
                            </View>
                            <View>
                                <Text style={[todoListStyles.smallTaskText, taskTextStyle]} numberOfLines={3}>
                                    {task.additionalsmalltasks}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

export default TaskItem;
