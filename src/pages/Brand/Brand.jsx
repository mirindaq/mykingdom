
import { allBrand, fils } from '/libs/brands-data/brands.js';
import React, { useEffect, useState } from 'react'

export default function Brand() {
  const alphabet = fils
  const allBrands = allBrand
  const [filters, setFilters] = useState(alphabet)
  const [brands, setBrands] = useState(allBrands)
  const[selected, setSelected] = useState(0)
  
  
  const handleFilter = (id) => {
    
    setSelected(id)
    if(id === 0){
      setBrands(allBrands)
    }else{
      setBrands(allBrands.filter(brand => brand.id === id))
    }
  }

  return (
    <div className='container mx-auto p-4'>
      {/* filter Navigation */}
      <div className='flex justify-center space-x-2 mb-4'>
        {filters.map((fil, index) => (
          <button 
          key={index}
          className={`px-4 py-2 rounded ${selected === index ? 'bg-red-500 text-white':'bg-white text-black'}`}
          onClick={() => handleFilter(parseInt(index))}
          >
            {fil}
          </button>
        ))}

      </div>
        {/* Content Section */}
      <div className='bg-yellow-100 p-4 rounded-lg shadow-md'>
        {brands.map((brand, index) => (
          <div key={brand.id}>
            <div className='flex items-center mb-4'>
            <div className='border-2 border-red-500 rounđe p-2 mr-4'>
              {brand.name}
            </div>
            <div className='flex space-x-2'>
              {brand.logos.map((logo, indexLogo) => (
                <img key={indexLogo} src={logo} alt="" className='rounded' width="100" height="50" />
              ))}
            </div>
          </div>
          {index < brands.length -1 && <hr className='border-red-500 mb-4'/>}
          </div>
        ))}
      </div>
    </div>
  )
}
