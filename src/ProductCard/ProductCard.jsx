import React from 'react'

function ProductCard({data}) {
  return (
    <>
    <div className="product-card">
      <h2>{data?.title}</h2>
      <p>{data?.description}</p>
      <div className='tag-component'>
        {
            data?.keywords.map((tag,index)=>(
                <span className='tag' key={index}>{tag}</span>
            )) 
        }
      </div>
    </div>
    </>
  )
}

export default ProductCard