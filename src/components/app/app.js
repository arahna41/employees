import {Component} from "react";
import nextId from "react-id-generator";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John', salary: 1000, increase: false, rise: true, id: 1},
                {name: 'David', salary: 800, increase: true, rise: false, id: 2},
                {name: 'Alex', salary: 1200, increase: false, rise: false, id: 3}
            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newArr = data.filter(item => item.id !== id);

            return {
                data: newArr
            }
        })
    }

    addItem = (name, salary) => {
        const idEmployee = nextId();

        const newEmployee = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: idEmployee
        }

        this.setState(({data}) => {
            const newArr = structuredClone(data);
            newArr.push(newEmployee);

            return {
                data: newArr
            }
        })
    }

    onToggleIncrease = (id) => {
        // Option 1
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //
        //     return {
        //         data: newArr
        //     }
        // })

        // Option 2
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        console.log(`Rise is ${id}`)
    }
    render() {
        const {data} = this.state;
        return (
            <div className="app">
                <AppInfo />

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList
                    data={data}
                    onDelete={this.deleteItem}
                    onToggleIncrease = {this.onToggleIncrease}
                    onToggleRise = {this.onToggleRise}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
