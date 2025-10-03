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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
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
          `${import.meta.env.VITE_BACKEND_URL}/post/getPostByAuthor/${author}`,
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


  // Profile.jsx
return (
  <>
    <Navbar />
    <section className="bg-gray-950 min-h-screen pt-24 pb-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
              {/* Cover Background */}
              <div className="h-32 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              
              {/* Profile Content */}
              <div className="relative px-6 pb-8">
                {/* Profile Image */}
                <div className="relative -mt-16 mb-4">
                  <img
                    className="w-32 h-32 rounded-2xl object-cover ring-4 ring-gray-950"
                    src={authorPfp}
                    alt={author}
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-950"></div>
                </div>

                {/* Profile Info */}
                <h1 className="text-2xl font-bold text-white mb-1">{author}</h1>
                <p className="text-cyan-400 text-sm mb-4">{email}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-800 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{posts.length}</p>
                    <p className="text-xs text-gray-400 mt-1">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">12.5K</p>
                    <p className="text-xs text-gray-400 mt-1">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">1.2K</p>
                    <p className="text-xs text-gray-400 mt-1">Following</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">About</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Full-stack developer passionate about creating elegant solutions to complex problems. Love sharing knowledge through writing.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    Follow
                  </button>
                  <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Published Articles</h2>
                <p className="text-gray-400 text-sm">Explore all posts by {author}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-colors duration-200">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post, i) => (
                  <SidebarPost key={post._id} {...post} />
                ))
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-2xl border border-gray-800">
                  <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                  <p className="text-gray-400">Start writing to share your thoughts with the world</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

}

export default Profile
