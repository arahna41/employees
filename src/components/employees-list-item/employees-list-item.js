import {Component} from "react";
import './employees-list-item.scss';

class EmployeesListItem  extends Component {
    render() {
        const {name, salary, onDelete, onToggleProp, onChangeSalary, increase, rise} = this.props;
        let classNames = "list-group-item d-flex justify-content-between";
        if (increase) {
            classNames += ' increase'
        }

        if (rise) {
            classNames += ' like'
        }

        return (
            <li className={classNames}>
            <span
                className="list-group-item-label"
                onClick={onToggleProp}
                data-toggle="rise"
                style={{fontSize: 32, color: "#333333"}}>
                {name}
            </span>

                <input
                    type="text"
                    className="list-group-item-input"
                    defaultValue={salary + '$'}
                    onChange={onChangeSalary}
                />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                            className="btn-cookie btn-sm "
                            onClick={onToggleProp}
                            data-toggle="increase" >
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete} >
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;