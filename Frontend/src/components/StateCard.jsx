import React from 'react'

export default function StateCard({state}){
  return (
    <div className='card'>
      <h3>{state.name}</h3>
      <p><strong>Capital:</strong> {state.capital}</p>
      <p><strong>Region:</strong> {state.region}</p>
      {state.slogan && <p><strong>Slogan:</strong> {state.slogan}</p>}
      {state.population != null && <p><strong>Population:</strong> {state.population.toLocaleString()}</p>}
      {state.landmarks && <p><strong>Landmarks:</strong> {state.landmarks}</p>}
    </div>
  )
}
