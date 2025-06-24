import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = () => {
    const {doctors }=useContext(AppContext);
    const [relDocs,setRelDocs]=useState();

  return (
    <div>

    </div>
  )
}

export default RelatedDoctors