import { StyleSheet } from 'react-native';

const calendarModalStyles = StyleSheet.create({
    addModalView: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 100,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 5,
    },
    addModalViews: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    modalBtnItem: {
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'stretch',
    },
    addModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});

export default calendarModalStyles;
