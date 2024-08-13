import { StyleSheet } from "react-native";

const joinMemberStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#3A75A8',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginbutton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3A75A8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',  
    fontSize: 16,
  },
});

export default joinMemberStyles;