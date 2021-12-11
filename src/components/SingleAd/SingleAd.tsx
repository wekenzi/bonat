import React, {useEffect, useState} from 'react'
import { getAd } from '../api';
import './SingleAd.css';

const SingleAd = ({ num, handleUniqeNum }:{num:number, handleUniqeNum:Function}) => {

    const [imageURL, setImageURL] = useState<string>('')

    useEffect(()=>{
        getAd(num).then(data => {
            setImageURL(data)
            handleUniqeNum()
        })
    },[])


    return (
        <div className="col-md-4 col-sm-6">
            <div className="card m-3 bg-info text-center">
                <div className="card-body">
                    {imageURL ? 
                        <img className='img-fluid' src={imageURL} alt="img" /> 
                    : 
                        <p className='m-0 text-center'>Loading Ad...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleAd
