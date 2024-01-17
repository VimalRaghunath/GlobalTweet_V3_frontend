import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./Explore.css"
import { TextField, Button } from '@mui/material';
import Widgets from './Widgets/Widgets';




function Explore() {

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  };


  return (

    <div className='Explore'>

      <Sidebar/>
     
      <div className='Exploree'>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {results.map((result) => (
        <div key={result._id}>
          <p>{result.text}</p>
        </div>
      ))}

    </div>

   

    </div>
  )
}

export default Explore
