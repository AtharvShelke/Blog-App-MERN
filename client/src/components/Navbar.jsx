
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [pfp, setPfp] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
                method: 'GET',
                credentials: 'include', // Ensures cookies are sent
            });

            if (!response.ok) {
                console.error('Error fetching user information');
                // Don't set user info if not logged in
                setUsername(null);
                setEmail(null);
                setPfp(null);
                return;
            }

            const userInfo = await response.json();
            setUsername(userInfo.username);
            setEmail(userInfo.email);
            setPfp(userInfo.profileImage);
        } catch (error) {
            console.error('Network or Server Error:', error);
            // Reset user info on error
            setUsername(null);
            setEmail(null);
            setPfp(null);
        }
    };

    fetchUserInfo();
}, []); // Runs once on mount

    

    const logout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                localStorage.removeItem('token');

                navigate('/login')
            } else {
                console.error('Logout failed', response);
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Logout failed', error.message);
            alert('Logout failed. Please try again.');
        }
    }
    // Navbar.jsx
return (
  <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-xl ring-1 ring-gray-700 group-hover:ring-cyan-500/50 transition-all duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    className="w-6 h-6 text-cyan-400" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
              </div>
              
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Blog<span className="text-cyan-400">Hub</span>
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {username ? (
              <>
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <span className="text-sm font-medium text-gray-200">{username}</span>
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      className="absolute right-0 mt-3 w-64 origin-top-right bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* User Profile */}
                      <Link to="/profile">
                        <div className="flex items-center space-x-3 p-4 hover:bg-gray-800/50 transition-colors duration-200">
                          <div className="relative">
                            <img
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20"
                              src={pfp}
                              alt="avatar"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate">{username}</h3>
                            <p className="text-xs text-gray-400 truncate">{email}</p>
                          </div>
                        </div>
                      </Link>

                      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                      {/* Menu Items */}
                      <Link to="/create">
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Create Post</span>
                        </button>
                      </Link>

                      <button 
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                        onClick={() => setShowModal(true)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    Register
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Confirm Logout</h2>
            </div>
            
            <p className="text-gray-400 mb-8">Are you sure you want to log out of your account?</p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  </>
);

}

export default Navbar;
