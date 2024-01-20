import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./Explore.css"
import { TextField, Button, CircularProgress } from '@mui/material';
import Widgets from './Widgets/Widgets';




function Explore({ userId }) {

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error.message);
      setError('An error occurred while searching. Please try again ')
    } finally {
      setLoading(false)
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

      {loading && <CircularProgress/>}

      {error && <p style={{ color: 'red' }} > {error} </p>}
 
      {results.map((result) => (
        <div key={result.name}>
          <p>{result.text}</p>
        </div>
      ))}

    </div>

   

    </div>
  )
}

export default Explore
