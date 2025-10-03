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
  return (

    <>
      <section className="bg-white dark:bg-gray-950">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1>

            <p className="max-w-lg mx-auto mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium
              quia tempore delect
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
            {
              posts.length > 0 && posts.map((post,i)=>(<Post key={post._id} {...post}/>))
            }


          </div>
        </div>
      </section>

    </>
  )
}

export default PostContainer
