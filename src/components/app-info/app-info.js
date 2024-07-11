import "./app-info.css";

const AppInfo = ({totalAmount, increased}) => {
    return (
        <div className="app-info">
            <h1>Employees List</h1>
            <h2>Total amount: {totalAmount}</h2>
            <h2>Salary rise: {increased}</h2>
        </div>
    )
}

export default AppInfo;