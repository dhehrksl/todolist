import { StyleSheet } from 'react-native';

const viewTaskModalStyles = StyleSheet.create({
    modalView: {
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
        margin: 10
    },
    smallTaskText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        maxHeight: 150,
        margin: 10
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
    dateText: {
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    inputContainer: {
        flex: 1,
    },
});

export default viewTaskModalStyles;
