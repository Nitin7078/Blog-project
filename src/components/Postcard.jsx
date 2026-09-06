import React from 'react';
import service from '../appwrite/config';
import {Link} from 'react-router-dom';

function Postcard({$id, title, featuredImage}){
    return (
        <>
        <Link to={`/post/${$id}`}>
            <div className='w-full h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='w-full h-48 object-cover rounded' />
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
        </>
    )
}


export default Postcard;