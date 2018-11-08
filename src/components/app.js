import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import React, { Component } from 'react';
import axios from 'axios';
import List from './list';
import AddItem from './add_item';
import { randomString } from '../helpers';

const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=c918_demoandrew';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: [],
            error: ''
        }
    }

    deleteItem = async (id) => {
        console.log('Delete item with ID:', id);

        const response = await axios.delete(`${BASE_URL}/${id + API_KEY}`);

        console.log('Delete Response:', response);

        this.getListData();
    };

    addItem = async (item) => {
        const response = await axios.post(BASE_URL + API_KEY, item);

        console.log('Add Item:', response);

        this.getListData();
    };

    componentDidMount(){
        this.getListData();
    }

        //FOR ES7 AND UNDER (.THEN)
        // getListData() {
        //http://api.reactprototypes.com/todos?key=c718_demouser
        // axios.get(BASE_URL + API_KEY).then((response) => {
        //     console.log('Server Response:', response);
        //
        //     this.setState({
        //         list: response.data.todos
        //     })
        // }).catch((error) => {
        //     console.log('Request Error', error.message);
        //     this.setState({
        //         error: 'Error getting todos'
        //     });
        //  });
        // }

        //FOR ES7 AND ABOVE
        //ASYNC-08 VERSION
        async getListData() {
            //http://api.reactprototypes.com/todos?key=c718_demouser
            try {

            const response = await axios.get(BASE_URL + API_KEY);

            this.setState({
                list: response.data.todos
            });
            } catch(error){
                this.setState({
                    error: 'Error getting todos'
                });
            }
        }




    render() {
        const { error } = this.state;

        return (
            <div className="container">
                <h1 className="center">To Do List</h1>

                <AddItem add={this.addItem}/>

                {
                    error
                        ? <h1 className="center red-text">{error}</h1>
                        : <List delete={this.deleteItem} data={this.state.list}/>
                }

            </div>
        );
    }
}

export default App;
