import { StyleSheet } from 'react-native';

const taskItemStyles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        flexWrap: 'wrap',
    },
    checkbox: {
        margin: 20,
        alignItems: 'center',
        marginLeft: 'auto',
    },
    viewTaskText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        maxHeight: 150,
    },
    taskText: {
        fontSize: 16,
    },
    smallTaskText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        maxHeight: 150,
    },
});

export default taskItemStyles;
