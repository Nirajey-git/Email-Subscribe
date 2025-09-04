import React, { use } from 'react'
import { useState, useEffect } from 'react';
import { client} from '../sanity';
import {PortableText} from '@portabletext/react';
import { NavLink } from 'react-router-dom';


export const AboutBlog = () => {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "post"] {title, description, publishedAt}`)
        .then((data) => {
            console.log("sanity data", data);
            setposts(data)})
        .catch(console.error);
    }, []);
return (
    <div className='mt-8 h-full flex flex-col px-4'>
        <div className=' absolute top-5 left-6 flex justify-start items-start'>
        <NavLink to={'/'}>
            <button className='p-2 bg-indigo-500 rounded-2xl w-[100px] text-white hover:bg-indigo-600'>← Back</button>
        </NavLink>
        </div>
        <div className='mt-10'>
        <h1 className='text-2xl font-bold'>Dashain Blogs</h1>
        {posts.length === 0 ? (
        <p>Loading posts...</p>
        ) : (
        
        posts.map((post, index) => (
            <div key={index} className="mt-3 mb-4 w-full p-3 rounded-lg">
            <h2 className='font-bold text-xl text-center'>{post.title}</h2>
            <div>
                {/* {post.body && <PortableText value={post.body} />} */}
                {post.description && <PortableText value={post.description}/>}
            </div>
            <small className='text-gray-500'>
                Published At: {new Date(post.publishedAt).toLocaleDateString()}
            </small>
            </div>
        ))
        )}
        </div>
        
    </div>
);
};