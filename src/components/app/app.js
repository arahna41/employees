import {Component} from "react";
import nextId from "react-id-generator";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John', salary: 1000, increase: false, rise: true, id: 1},
                {name: 'David', salary: 800, increase: true, rise: false, id: 2},
                {name: 'Alex', salary: 1200, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
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

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onChangeSalary = (id, updatedSalary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, 'salary': updatedSalary}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPosts = (items, filter) => {
       switch (filter) {
           case 'rise':
               return items.filter(item => item.rise);
           case 'moreThan1000':
               return items.filter(item => item.salary > 1000);
           default:
               return items;
       }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const totalAmount = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPosts(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo totalAmount={totalAmount} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
