import React, { useEffect, useState } from 'react'
import SidebarPost from './SidebarPost';

const Sidebar = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/post/`, {
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
    <>

      <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
        {posts.length > 0 && posts.slice(0, 4).map((post, i) => (
          <SidebarPost key={i + 1} {...post} /> // Add 1 to the key to match the original index
        ))}

      </div>
    </>
  )
}

export default Sidebar
