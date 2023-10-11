import { Button, TextInput, View } from "react-native";
import { buttonSecondaryColor, textInputStyle } from "./base-style";
import { Todo, createTodo, updateTodo } from "../services/todo-service";
import { showAlert } from "../services/dialog-service";
import { AppState } from "./app-state";

const createDefaultTodo = () => ({ text: '', createdAt: new Date });

export const TodoForm = (props: {
    state: AppState,
    onLoadRequest: (load: boolean) => void,
    onEditItem: (todo: Todo) => void,
}): JSX.Element => {
    
    const editingText: Todo = {...(props.state.editingTodo || createDefaultTodo())};

    const save = async () => {
        try {
            const action = editingText.id ? updateTodo : createTodo;
            await action(editingText);
            props.onLoadRequest(true);
            setTimeout(() => props.onEditItem(createDefaultTodo()), 200);
        } catch (err) {
            console.error(err);
            showAlert({ title: 'Error', message: 'Error on save todo item.' });
        }
    };
    
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput 
                style={{...textInputStyle, width: '60%'}}
                value={editingText.text}
                onChangeText={text => props.onEditItem({...editingText, text})}
                accessibilityElementsHidden={true}
            />
            <View style={{
                width: '40%',
                display: 'flex',
                flexDirection: 'row'
            }}>
                <View style={{width: '50%'}}>
                    <Button 
                        title="Cancel"
                        onPress={() => props.onEditItem(createDefaultTodo())}
                        color={buttonSecondaryColor}
                    />
                </View>
                <View style={{width: '50%'}}>
                    <Button title="Save" onPress={() => save()} />
                </View>
            </View>
        </View>
    );
}