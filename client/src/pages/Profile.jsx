import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SidebarPost from '../components/SidebarPost';

const Profile = () => {
  const [author, setAuthor] = useState('');
  const [authorPfp, setAuthorPfp] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://blog-app-mern-api.vercel.app/profile', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userInfo = await response.json();
        setAuthor(userInfo.username);
        setEmail(userInfo.email)
        setAuthorPfp(userInfo.profileImage);

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!author) return; // Wait for author to be set
      try {
        const response = await fetch(
          `http://localhost:3000/post/getPostByAuthor/${author}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!response.ok) {
          console.error('Error fetching post info:', response);
        }
        const postInfo = await response.json();
        setPosts(postInfo);
      } catch (error) {
        console.error('Error fetching post info:', error);
      }
    };
    fetchUserPosts();
  }, [author]); // Add author as a dependency


  return (

    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center">
            <img className="object-contain object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src={authorPfp} alt="" />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-5xl font-semibold text-blue-500 ">“</p>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                {author}
              </h1>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 mb-6">
                {email}
              </p>


              <p className="font-medium text-blue-500 dark:text-blue-400 mb-3">Blogs</p>
              <div className="mt-8 px-6 pt-4 w-3/4 max-h-80 [&::-webkit-scrollbar]:[width:10px]
            [&::-webkit-scrollbar-thumb]:bg-gray-600
            overflow-y-scroll border border-gray-700 ">

                {posts.length > 0 && posts.map((post, i) => (
                  <SidebarPost key={i + 1} {...post} /> // Add 1 to the key to match the original index
                ))}
                

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Profile
