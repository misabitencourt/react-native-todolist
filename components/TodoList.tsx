import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Todo, destroyTodo, listTodo } from "../services/todo-service";
import { AppState } from "./app-state";
import { editIconBase64, removeIconBase64 } from "../repos/images";
import { showConfirm } from "../services/dialog-service";

export function TodoList(props: {
    state: AppState,
    onLoadRequest: (load: boolean) => void,
    onEditItem: (item: Todo) => void
}): JSX.Element {

    const [todolist, setTodolist] = useState([] as Todo[]);
    
    const loadItems = () => listTodo().then((todos: Todo[]) => {
        setTodolist([...todos]);
        props.onLoadRequest(false);
        console.log('LOADED TODOS', todos);
    });

    if (props.state.loading) {
        loadItems();
    }

    const remove = async (todo: Todo) => {
        const confirmed = await showConfirm({ title: 'Deletar?', message: 'Confirm item removing?' });
        if (!confirmed) {
            return;
        }
        destroyTodo(todo.id || 0).then(() => {
            props.onLoadRequest(false);
            loadItems();
            props.onEditItem({ text: '', createdAt: new Date });
        });
    };

    return (
        <View>
            {props.state.loading ? (

                <Text>Loading...</Text>

            ): (

                todolist.map((todoItem, index) => (
                    <View key={index} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: index % 2 === 0 ? '#DDD' : 'transparent',
                        paddingHorizontal: 13,
                        paddingVertical: 24
                    }}>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#333',
                            width: '85%'
                        }}>{todoItem.text}</Text>
                        <View style={{
                            width: '15%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Pressable onPress={() => props.onEditItem({...todoItem})}>
                                <Image source={{uri: editIconBase64}} style={{width: 18, height: 18}} />
                            </Pressable>
                            <Pressable onPress={() => remove(todoItem) }>
                                <Image source={{uri: removeIconBase64}} style={{width: 18, height: 18}} />
                            </Pressable>
                        </View>
                    </View>
                ))

            )}
        </View>
    );
}