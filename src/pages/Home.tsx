import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }
    setTasks(prevState => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    let editTask = updatedTasks.find(task => task.id === id);
    if(!editTask){
      return;
    }
    editTask.done = !editTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => prevState.filter((task) => {
      return task.id != id;
    }));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
