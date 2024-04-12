
type SearchProps = {
  search : string,
  setSearch :  React.Dispatch<React.SetStateAction<string>>
}
const Search = ( props : SearchProps ) => {
  return (
    <div className="search">
        <h2>Pesquisar:</h2>
        <input 
            type="text" 
            value={props.search} 
            onChange={(e) => props.setSearch(e.target.value)} 
            placeholder="Digite para pesquisar..." 
        />
    </div>
  );
}

export default Search