import axios from "axios";
import { URI_APIS } from '@env';

const apiUrl = URI_APIS;
const endpoints = {
  todoList: '/todoList',
  deleteList: '/deleteList',
  updateTaskList: '/updateTaskList',
  outToggleTaskCheck: '/outToggleTaskCheck',
  selectDateAndSearchComplete: '/selectDateAndSearchComplete'
};

export const fetchTasks = async (userEmailState) => {
  try {
    const listdata = await axios.get(`${apiUrl}${endpoints.todoList}?email=${userEmailState}`);
    return listdata.data;
  } catch (err) {
    console.error('목록 가져오기 실패:', err);
    throw err;
  }
};

export const addTodayTasks = async (taskData) => {
  try {
    await axios.post(`${apiUrl}${endpoints.todoList}`, taskData);
  } catch (error) {
    console.error('작업 추가 실패:', error);
    throw error;
  }
};

export const updateTask = async (updatedTask) => {
  try {
    await axios.post(`${apiUrl}${endpoints.updateTaskList}`, updatedTask);
  } catch (error) {
    console.error('작업 수정 실패:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.post(`${apiUrl}${endpoints.deleteList}`, { id: taskId });
  } catch (error) {
    throw error;
  }
};

export const outToggleTaskCheck = async (updatedCheckedTask) => {
  try {
    await axios.post(`${apiUrl}${endpoints.outToggleTaskCheck}`, updatedCheckedTask);
  } catch (error) {
    console.error('체크 상태 업데이트 실패:', error);
    throw error;
  }
};

export const selectDateAndSearchComplete = async (date, email, done, keyword) => {
  try {
    const response = await axios.post(`${apiUrl}${endpoints.selectDateAndSearchComplete}`, {
      date,
      email,
      done,
      keyword
    });
    return response.data;
  } catch (error) {
    console.error('월에 따른 데이터 요청 실패:', error);
    throw error;
  }
};
