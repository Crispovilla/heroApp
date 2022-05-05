import React from 'react'
import { HeroList } from '../hero/HeroList'

export const MarvelScreen = ( heroes ) => {
  return (
   <>
     <h1>MarvelScreen</h1>
     <hr />     
       <HeroList publisher="Marvel Comics"/>     
   </>
  )
}
