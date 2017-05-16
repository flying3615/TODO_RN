import React from 'react';
// import {Navigator} from 'react-native'
import NavigationExperimental from 'react-native-deprecated-custom-components';
import TaskList from "./TaskList"
import TaskForm from "./TaskForm"

class Todo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                {
                    task: 'Learn react native'
                },
                {
                    task: 'Learn react Redux'
                }
            ]
        }
    }

    onAddStarted() {
        this.nav.push({
            name: 'taskform',
        })
    }

    onCancel() {
        console.log('cancel!!!');
        this.nav.pop();
    }

    onDone(todo) {
        console.log('task was completed', todo.task)
        const filteredTodos = this.state.todos.filter((filterTodo) => {
            return filterTodo !== todo
        })
        this.setState({todos: filteredTodos})
    }


    onAdd(task) {
        console.log('a task was add', task);
        this.state.todos.push({task})
        this.setState({todos: this.state.todos})
        this.nav.pop();
    }


    renderScene(route, nav) {
        switch (route.name) {
            case 'taskform':
                return (<TaskForm onCancel={this.onCancel.bind(this)} onAdd={this.onAdd.bind(this)}/>)
            default:
                return (<TaskList todos={this.state.todos} onDone={this.onDone.bind(this)}
                                  onAddStarted={this.onAddStarted.bind(this)}/>)


        }
    }

    configureScene() {
        return NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom
    }


    render() {
        return (
            <NavigationExperimental.Navigator
                configureScene={this.configureScene}
                initialRoute={{name: 'tasklist', index: 0}}
                ref={(nav) => {
                    this.nav = nav;
                }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}


export default Todo;