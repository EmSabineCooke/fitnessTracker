import React, { useEffect } from 'react';
import Dropdown from "react-bootstrap/Dropdown";



const Search = ({ searchInput, select, searchTerm }) => {
  const handleChange = (event) => {
    searchInput(event.target.value)
  }

  return (
    <form id="searchForm">
      <input onChange={handleChange} placeholder="search" />
      {select[0] ?
        <Dropdown>
          <Dropdown.Toggle>
            {searchTerm}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {

            }
          </Dropdown.Menu>
        </Dropdown> : null}


    </form>
  )
}

export default Search