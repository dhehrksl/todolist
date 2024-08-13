import { StyleSheet } from 'react-native';

const todoListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E5EB',
        paddingHorizontal: 20,
        paddingTop: 60,
        
    },
    horizontalContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    horizontalbutton: {
        height: 40,
        width:"95%",
        marginLeft: 10,
    },
    buttonadd: {
        marginBottom: 10, 
    },
    btnText: {
        height: 40,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
        color: '#007bff',
        paddingHorizontal: 0,
        
    },
    btnTextSelected: {
        height: 40,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
        color: '#007bff',
        paddingHorizontal: 0,
        
        
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
        width: '80%',
        margin: 10
        
    },
    listMargin: {
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        margin: 5,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: '#007bff',
        borderWidth: 1,
        marginHorizontal: 5,
    },
});

export default todoListStyles;