import React from 'react'
import HotelCard from '../HotelCard'

const HotelsResults = ({ data , queryString }) => {
    return (
        <div>{data?.map((hotel, index) => <HotelCard
            queryString={queryString}
            key={hotel.id}
            data={hotel}
            resultsCount={data?.length}
            index={index}
        />)}</div>
    )
}

export default HotelsResults