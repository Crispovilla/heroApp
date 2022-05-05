import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByName';
import { HeroCard } from '../hero/HeroCard';
import { useForm } from '../hooks/useForm';
import queryString from 'query-string'
import { useMemo } from 'react';
export const SearchScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { q = '' } = queryString.parse(location.search)

  const [ formValues, handleInputChange ] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const heroesFilter = useMemo(() => getHeroByName( q ), [ q ]);
  
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`?q=${ searchText }`)
   
  }
  return (
   
    <>
      <h1>Búsquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit= { handleSearch }>
            <input 
            type="text" 
            placeholder='Buscar héroe'
            className='form-control'
            name='searchText'
            autoComplete='off'
            value={ searchText }
            onChange={ handleInputChange }
            />
            <button type='submit' className='btn btn-primary mt-1'>Buscar</button>
          </form>
        </div>
        
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {
            ( q === '' )
            ? <div className="alert alert-info"> Buscar un héroe </div>
            : ( heroesFilter.length === 0 )
            && <div className="alert alert-danger"> No hay resultados: { q } </div>
          }
          
          {
            heroesFilter.map(hero =>(
              <HeroCard 
                key={ hero.id }
                { ...hero }
              />
            ))
          }
        </div>
      </div>
    
    </>
  )
}
