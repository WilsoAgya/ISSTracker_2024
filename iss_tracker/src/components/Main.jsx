import react from 'react';

const Main= ()=>{
    return(
    <div className="row mx-auto my-5 g-3">
        <div className="col-10 col-md-6 bg-white mx-auto rounded-3 border" style={{ height: '400px' }}>
            GOOGLE MAP 
        </div>
        <div className="col-10 col-md-4 bg-dark mx-auto d rounded-3 py-3 px-5">
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='lighter p-2 mt-3 mb-1 mx-5 rounded-2'>
                    <h1 className='text-white timer px-5'>00:00:00</h1>
                </div>
                <p className='text-white mb-5'>Time until the ISS passes LOCATION</p>
            </div>
            
            <h4 className='text-white mb-3'>• Longitude: 000000</h4>
            <h4 className='text-white mb-3'>• Latitude: 000000</h4>
            <h4 className='text-white mb-3'>• Altitude: 000000</h4>
            <h4 className='text-white mb-3'>• Speed: 000000</h4>
        </div>
    </div>
    )
}


export default Main