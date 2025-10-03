import React, { useEffect, useState } from 'react'
import SidebarPost from './SidebarPost';

const Sidebar = () => {
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
  return (
   // Sidebar.jsx
<>
  <div className="lg:col-span-1">
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Latest Posts</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent ml-4"></div>
      </div>
      
      <div className="space-y-4">
        {posts.length > 0 && posts.slice(0, 4).map((post, i) => (
          <SidebarPost key={post._id} {...post} />
        ))}
      </div>
    </div>
  </div>
</>

  )
}

export default Sidebar
