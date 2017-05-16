import {View, ListView, StyleSheet, TouchableHighlight, Text} from 'react-native'
import React from 'react'
import TaskRow from './TaskRow/Component'

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start'
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    }
})

class TaskList extends React.Component {

    constructor(props, context) {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })

        this.state = {
            dataSource: ds.cloneWithRows(props.todos)
        }

    }

    //refresh list view when data changed
    componentWillReceiveProps(nextProps){
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos)
        this.setState({dataSource})
    }

    renderRow(todo) {
        return (
            <TaskRow onDone={this.props.onDone} todo={todo}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          key={this.props.todos}/>

                <TouchableHighlight style={styles.button} onPress={this.props.onAddStarted} >
                    <Text style={styles.buttonText}>
                        Add one
                    </Text>
                </TouchableHighlight>

            </View>
        )
    }
}

TaskList.propTypes = {
    onDone: React.PropTypes.func.isRequired,
    onAddStarted: React.PropTypes.func.isRequired,
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default TaskList