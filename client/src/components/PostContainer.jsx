import React, { useEffect, useState } from 'react'
import Post from './Post'

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const postData = await response.json();

        setPosts(postData)


      } catch (error) {
        console.error('Error fetching user info:', error);
      }


    };
    fetchPost();

  }, []);
  // PostContainer.jsx
return (
  <>
    <section className="bg-gray-950 py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Blog
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            From the Blog
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed">
            Explore insights, tutorials, and stories from our community of developers and creators
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {posts.length > 0 && posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </section>
  </>
);

}

export default PostContainer
