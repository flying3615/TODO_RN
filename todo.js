import React from 'react';
// import {Navigator} from 'react-native'
import NavigationExperimental from 'react-native-deprecated-custom-components';
import TaskList from "./TaskList"
import TaskForm from "./TaskForm"
import store from './todoStore'

class Todo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
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
        store.dispatch({
            type:'DONE_TODO',
            todo
        })
    }


    onAdd(task) {
        console.log('a task was add', task);
        store.dispatch({
            type:'ADD_TODO',
            task,
        })
        this.nav.pop();
    }

    onToggle(){
        store.dispatch({
            type:'TOGGLE_STATE'
        })
    }


    renderScene(route, nav) {
        switch (route.name) {
            case 'taskform':
                return (<TaskForm onCancel={this.onCancel.bind(this)} onAdd={this.onAdd.bind(this)}/>)
            default:
                return (<TaskList onToggle={this.onToggle.bind(this)} filter={this.state.filter} todos={this.state.todos} onDone={this.onDone.bind(this)}
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