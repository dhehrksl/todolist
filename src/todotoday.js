import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Alert, FlatList, TouchableOpacity, RefreshControl, Button } from 'react-native';
import moment from 'moment-timezone';
import todoListStyles from '../src/style/homescreenstyles';
import {
    addTodayTasks,
    updateTask,
    deleteTask,
    outToggleTaskCheck,
    selectDateAndSearchComplete,
} from '../lib/apiutil';    
import TaskItem from '../lib/taskitem';
import AddTaskModal from '../lib/addtaskmodal';
import ViewTaskModal from '../lib/viewtaskmodal';
import CalendarModal from '../lib/calendarmodal';

const HomeScreen = ({ userEmailState }) => {
    const [detailTasks, setDetailTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskText, setEditTaskText] = useState('');
    const [additionalSmallTasks, setAdditionalSmallTasks] = useState('');
    const [taskDeleteIndex, setTaskDeleteIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState();
    const [viewDate, setViewDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [checkedFilters, setCheckedFilters] = useState('');
    const [insideCheckBoxData, setInsideCheckBoxData] = useState(false);
    const [addMonth, setAddMonth] = useState('');
    const timeFormat = moment().format('YYYY-MM-DD');
    const [calendarMonthAddButtonDisappear, setCalendarMonthAddButtonDisappear] = useState(false);

    
    useEffect(() => {
        getFilteredDataAndSearch();
    }, [checkedFilters, selectedDate, addMonth, userEmailState]);
    
    const getFilteredDataAndSearch =  async () => {
        try {
            const response = await selectDateAndSearchComplete(
                selectedDate ? selectedDate : addMonth,
                userEmailState,
                checkedFilters,
                searchKeyword
            );
            const tasksWithKoreanDate = response.map(task => ({
                ...task,
                date: moment.utc(task.date).tz('Asia/Seoul').format('YYYY-MM-DD')
            }));
            setDetailTasks(tasksWithKoreanDate);
        } catch (err) {
            console.error('목록 가져오기 실패:', err);
        }
    };

    const addTaskDate = async()=>{
        try {
            const dateToSave = selectedDate || timeFormat;
            const formattedDate = moment(dateToSave).format('YYYY-MM-DD'); 
            if (newTask) {
                await addTodayTasks({
                    email: userEmailState,
                    task: newTask,
                    date: formattedDate, 
                    ischecked: false,
                    additionalsmalltasks: additionalSmallTasks
                });
                console.log('할 일 추가 성공');
            } else {
                Alert.alert('일정을 추가해주세요.');
            }
        } catch (error) {
            console.error('작업 실패:', error);
            Alert.alert('작업에 실패했습니다.');
        }
    }

    const outToggleTask = async (task) => {
        try {
            const updatedIsChecked = !task.isChecked;
            const updatedTasks = detailTasks.map(updateListIsChecked =>
                updateListIsChecked.id === task.id
                    ? { ...updateListIsChecked, isChecked: updatedIsChecked }
                    : updateListIsChecked
            );
            const updatedCheckedTask = { id : task.id, ischecked : updatedIsChecked };
            setDetailTasks(updatedTasks);
            await outToggleTaskCheck(updatedCheckedTask);
            console.log('체크 상태 업데이트 성공');
        } catch (error) {
            console.error('체크 상태 업데이트 실패:', error);
            Alert.alert('체크 상태를 업데이트하는 데 실패했습니다.');
        }
    };
    
    const selectDeleteTaskData = async () => {
        try {
            if (taskDeleteIndex) {
                await deleteTask(taskDeleteIndex);s
                console.log('삭제완료');
            } else {
                Alert.alert('ID가 없습니다.');
            }
        } catch (error) {
            Alert.alert('존재하지 않는 리스트입니다.');
        }
        getFilteredDataAndSearch();
    }

    const onPressEditTaskData = async ()=>{
        try {
            const updatedTask = {
                id: viewDate.id,
                task: editTaskText,
                date: selectedDate,
                ischecked: !insideCheckBoxData,
                additionalsmalltasks: additionalSmallTasks
            };
            await updateTask(updatedTask);
            setInsideCheckBoxData(updatedTask.ischecked);
            setIsViewModalVisible(false);
            console.log('할 일 수정 성공');
        } catch (error) {
            console.error('수정 실패:', error);
            Alert.alert('수정에 실패했습니다.');
        }
    }

    const onRefresh = useCallback(() => {
        setSearchKeyword('');
        setSelectedDate('');
        setAddMonth('');
        setCheckedFilters('');
        getFilteredDataAndSearch();
    });

    const selectDeleteTask = async () => {
        selectDeleteTaskData();
        setIsModalVisible(false);
        onPressModalClose();
    };

    const onPressEditTask = async () => {
        onPressEditTaskData();
        setEditTaskText('');
        setAdditionalSmallTasks('');
        setSelectedDate('');
        setAddMonth('');
        setInsideCheckBoxData(insideCheckBoxData);
    };

    const addTask = async () => {
        setViewDate(null);
        setNewTask('');
        setAdditionalSmallTasks('');
        addTaskDate();
        if(!newTask){
            setIsModalVisible(true)
        }else{
            setIsModalVisible(false);
            setSelectedDate('');
            setAddMonth('');
        }
    };

    const handleDayPress = (day) => {
        setIsCalendarModalVisible(false);
        const calendarPickDate = day.dateString;
        getFilteredDataAndSearch();
        setSelectedDate(calendarPickDate);
    };

    const handleMonthPress = (month) => {
        console.log(month);
        setAddMonth( month.dateString.slice(0,7));
        setSelectedDate('');
    };

    const toggleTab = () => {
        if (checkedFilters === '') {
            setCheckedFilters('0');
        } else if (checkedFilters === '0') {
            setCheckedFilters('1');
        } else {
            setCheckedFilters('');
        }
    };

    const openAddModal = () => {
        setIsModalVisible(true);
        setAdditionalSmallTasks('');
        setCalendarMonthAddButtonDisappear(true);
        setEditTaskText('');
        setNewTask('');
        setSelectedDate(moment().format('YYYY-MM-DD'))        
    };

    const openViewModal = (task) => {      
        setIsViewModalVisible(true);
        setTaskDeleteIndex(task.id);
        setInsideCheckBoxData(!task.isChecked);
        setSelectedDate(task.date.slice(0,10));
        setViewDate(task);
        setEditTaskText(task.task);
        setAdditionalSmallTasks(task.additionalsmalltasks);
        setCalendarMonthAddButtonDisappear(true);
    };

    const onPressAddModalClose = () => {
        setIsViewModalVisible(false);
        setAdditionalSmallTasks('');
        setNewTask('');
        setSelectedDate('');
        setIsModalVisible(false);
        setAddMonth('');
    };

    const onPressCalendarModalClose = async () => {
        setIsCalendarModalVisible(false);
        calendarModalClose();
        getFilteredDataAndSearch();
    };

    const onPressCalendarMonthAddModal = async () => {
        setSelectedDate('');
        setIsCalendarModalVisible(false);
        calendarModalClose();
    };

    const calendarModalClose = async() => {
        if (addMonth) {
            setIsCalendarModalVisible(false);
        } else if (selectedDate) {
            setIsCalendarModalVisible(false);
        } else { 
            try {
                getFilteredDataAndSearch();
                setSelectedDate('');
                setAddMonth('');
                setDetailTasks(tasksWithKoreanDate);
            } catch (err) {
                console.error('목록 가져오기 실패:', err);
            }
        }
    };

    const onPressModalClose = () => {
        setIsViewModalVisible(false);
        setAdditionalSmallTasks('');
        setNewTask('');
        setIsModalVisible(false);
        setAddMonth('');
        setSelectedDate('');
    };

    const handleSearch = (text) => {
        setSearchKeyword(text.trim());
    };

    const SearchButton = () => {
        getFilteredDataAndSearch();
    };

    const tasksByDate = detailTasks.length > 0 ?
        detailTasks.reduce((acc, item) => {
            const dateKey = moment(item.date).format('YYYY-MM-DD');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(item);
            return acc;
        }, {}) : {};

    const handleText = (text) => {
        setNewTask(text);
    };

    const smallTaskhandleText = (text) => {
        setAdditionalSmallTasks(text);
    };


    const openCalendarAddDay = () => {
        setIsCalendarModalVisible(true);
        setCalendarMonthAddButtonDisappear(false);
    };


    const renderItem = ({ item }) => {
        const selectedDay = moment(item.date).format('YYYY-MM-DD');
        const currentDate = timeFormat;
        return (
            <TaskItem
                item={item}
                dateToSave={selectedDay}
                currentDate={currentDate}
                outToggleTask={outToggleTask}
                openViewModal={openViewModal}
            />
        );
    };

    return (
        <View style={todoListStyles.container}>
            <View style={todoListStyles.horizontalbutton} >
                <Button title='일정 추가' onPress={openAddModal} />
            </View>
            <View style={todoListStyles.buttonContainer}>
                <TouchableOpacity style={todoListStyles.button} onPress={onRefresh}>
                    <Text style={todoListStyles.btnText}>초기화</Text>
                </TouchableOpacity>
                <TouchableOpacity style={todoListStyles.button} onPress={openCalendarAddDay}>
                    <Text style={todoListStyles.btnText}>
                        {selectedDate ? selectedDate : addMonth ? `${addMonth}` : '날짜 선택'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={todoListStyles.button} onPress={toggleTab}>
                    <Text style={todoListStyles.btnTextSelected}>
                        {checkedFilters === '' ? '전체' : checkedFilters === '1' ? '미완료' : '완료'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={todoListStyles.horizontalContainer}>
                <TextInput
                    style={todoListStyles.searchInput}
                    placeholder="내용 검색"
                    value={searchKeyword}
                    onChangeText={handleSearch}
                />
                <Button title='검색' onPress={SearchButton}></Button>
            </View>

            <FlatList
                style={todoListStyles.listMargin}
                data={Object.keys(tasksByDate).map(date => ({
                    date: date,
                    tasks: tasksByDate[date]
                }))}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
            />

            <AddTaskModal
                isModalVisible={isModalVisible}
                newTask={newTask}
                additionalSmallTasks={additionalSmallTasks}
                handleText={handleText}
                smallTaskhandleText={smallTaskhandleText}
                addTask={addTask}
                onPressModalClose={onPressAddModalClose}
                selectedDate={selectedDate}
                setIsCalendarModalVisible={setIsCalendarModalVisible}
                setSelectedDate={setSelectedDate}
                setCalendarMonthAddButtonDisappear = {setCalendarMonthAddButtonDisappear}
            />

            <ViewTaskModal
                isViewModalVisible={isViewModalVisible}
                viewDate={viewDate}
                editTaskText={editTaskText}
                additionalSmallTasks={additionalSmallTasks}
                insideCheckBoxData={insideCheckBoxData}
                setEditTaskText={setEditTaskText}
                setAdditionalSmallTasks={setAdditionalSmallTasks}
                setInsideCheckBoxData={setInsideCheckBoxData}
                onPressEditTask={onPressEditTask}
                selectDeleteTask={selectDeleteTask}
                onPressModalClose={onPressModalClose}
                setIsCalendarModalVisible={setIsCalendarModalVisible}
                selectedDate = {selectedDate}
            />

            <CalendarModal
                isCalendarModalVisible={isCalendarModalVisible}
                handleDayPress={handleDayPress}
                handleMonthPress={handleMonthPress}
                setIsCalendarModalVisible={setIsCalendarModalVisible}
                onPressCalendarModalClose={onPressCalendarModalClose}
                onPressCalendarMonthAddModal={onPressCalendarMonthAddModal}
                setCalendarMonthAddButtonDisappear={setCalendarMonthAddButtonDisappear}
                calendarMonthAddButtonDisappear={calendarMonthAddButtonDisappear}
            />
        </View>
    );
};

export default HomeScreen;
