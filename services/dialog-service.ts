import { Alert } from "react-native";

export const showAlert = (alertParams: {
    title: string;
    message: string;
}) => new Promise(resolve => {
    Alert.alert(alertParams.title, alertParams.message, [
        { text: 'OK', onPress: () => resolve },
    ]);
});


export const showConfirm = (alertParams: {
    title: string;
    message: string;
}) => new Promise(resolve => {
    Alert.alert(alertParams.title, alertParams.message, [
        {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => resolve(true) },
    ]);
});