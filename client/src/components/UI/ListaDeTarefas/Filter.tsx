type FilterProps = {
  filter : string,
  setFilter : React.Dispatch<React.SetStateAction<string>>
}
const Filter = (props : FilterProps) => {
  const {filter, setFilter}  = props;
  return (
    <div className="filter">
        <h2>Filtrar</h2>
        <div className="filter-options">
            <div>
                {/* <p>Status</p> */}
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">Todas</option>
                    <option value="Completed">Completas</option>
                    <option value="Incomplete">Incompletas</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default Filter