import { StyleSheet } from 'react-native';

const addTaskModalStyles = StyleSheet.create({
    addModalView: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 100,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 5,
    },
    viewTaskText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        maxHeight: 150,
    },
    smallTaskText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        maxHeight: 150,
    },
    modalBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalBtnItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default addTaskModalStyles;
