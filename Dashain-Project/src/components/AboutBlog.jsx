import React, { useState, useEffect } from 'react'
import { client } from '../sanity'
import { PortableText } from '@portabletext/react'
import { NavLink } from 'react-router-dom'
import { urlFor } from '../sanity' // make sure you added urlFor in sanity.js

export const AboutBlog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
          title,
          publishedAt,
          body,
          author->{
            name,
            bio,
            image
          }
        } | order(publishedAt desc)`
      )
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching posts:", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="h-auto min-h-screen flex justify-center px-4">
      <div className="mt-12 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">Dashain Blogs</h1>

        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts found.</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="mt-6 mb-6 w-full p-5 rounded-2xl shadow-md bg-[#F0F8FF]]"
            >
             
              <h2 className="font-bold text-2xl text-center">{post.title}</h2>

           
              {post.body && (
                <div className="mt-3 text-justify leading-relaxed">
                  <PortableText value={post.body} />
                </div>
              )}

              
              {post.author && (
                <div className="mt-4 flex items-center gap-4">
                  {post.author.image && (
                    <img
                      src={urlFor(post.author.image).width(80).url()}
                      alt={post.author.name}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    {post.author.bio && (
                      <div className="text-sm text-gray-600">
                        <PortableText value={post.author.bio} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              
              <small className="text-gray-500 block mt-3">
                Published At:{" "}
                {new Date(post.publishedAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>

     
      <div className="absolute top-3 left-6 flex justify-start items-start">
        <NavLink to={"/"}>
          <button className="p-2 bg-indigo-500 rounded-2xl w-[100px] text-white hover:bg-indigo-600">
            ← Back
          </button>
        </NavLink>
      </div>
    </div>
  )
}
