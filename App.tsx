import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { baseStyle } from './components/base-style';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { AppHeader } from './components/AppHeader';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { initialState } from './components/app-state';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = useState(initialState());

  const mainViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%'
  };

  return (
    <SafeAreaView style={{...baseStyle, ...mainViewStyle}}>
      <AppHeader />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingVertical: 21, 
          paddingHorizontal: 13
        }}>
          <TodoList 
            state={state} 
            onLoadRequest={load => setState({...state, loading: load})}
            onEditItem={todo => setState({...state, editingTodo: todo})}
          />
      </ScrollView>
      <TodoForm 
        state={state}
        onLoadRequest={load => setState({...state, loading: load})}
        onEditItem={todo => setState({...state, editingTodo: todo})}
      />
    </SafeAreaView>
  );
}

export default App;
