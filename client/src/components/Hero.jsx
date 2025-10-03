import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import Loader from './Loader';

const Hero = () => {

    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [author, setAuthor] = useState();
    const [authorPfp, setAuthorPfp] = useState();
    const [summary, setSummary] = useState();
    
    useEffect(() => {
        const fetchLatestPost = async () => {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/getLatestPost`, {
                method: 'GET'

            });
            if (!response.ok) {
                
                throw new Error('Error in fetching latest post');

            }
            const post = await response.json();


            setId(post._id)
            setTitle(post.title)
            setThumbnail(post.thumbnail)
            setAuthor(post.author)
            setAuthorPfp(post.authorPfp)
            setSummary(post.summary)
        }
        fetchLatestPost();
        
    }, []);

    // Hero.jsx
return (
  <>
    <section className="bg-gray-950 min-h-screen pt-20 pb-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Featured Post */}
          <div className="lg:col-span-2 group">
            <Link to={`/blog/${id}`}>
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  className="object-cover w-full h-[300px] sm:h-[400px] lg:h-[500px] transition-transform duration-500 group-hover:scale-105" 
                  src={thumbnail} 
                  alt={title}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent opacity-90"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 backdrop-blur-sm rounded-full border border-cyan-500/20">
                    Featured
                  </span>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {title}
                  </h1>
                  
                  <p className="text-sm sm:text-base text-gray-300 mb-6 line-clamp-2">
                    {summary}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20" 
                        src={authorPfp} 
                        alt={author}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950"></div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-white">{author}</h3>
                      <p className="text-xs text-gray-400">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </section>
  </>
);

}

export default Hero
