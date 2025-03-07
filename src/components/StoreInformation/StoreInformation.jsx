import React from 'react'

export default function StoreInformation(props) {

    const {s} = props;
    
    return (
        <div className="border-b p-4">
            <p className="font-bold text-lg">[{s.id}] {s.name}</p>
            <p className="text-gray-500">{s.address}</p>
            <p className="text-gray-500">{s.phone}</p>
        </div>
    )
}
