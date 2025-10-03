
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
                    // Add more detailed logging for the response
                    const errorMessage = await response.text();
                    console.error('Error fetching user information:', errorMessage);
                    return;
                }
    
                const userInfo = await response.json();
                // Assuming setUsername, setEmail, and setPfp are defined as state setters
                setUsername(userInfo.username);
                setEmail(userInfo.email);
                setPfp(userInfo.profileImage);
                localStorage.setItem('token')
            } catch (error) {
                console.error('Network or Server Error:', error);
            }
        };
    
        fetchUserInfo();
    
        // Cleanup function to cancel the request if component unmounts
        return () => {
            // Abort fetch if needed (optional, only necessary if you add aborting logic)
        };
    }, []); // Empty array as dependencies to run once after mounting
    
    

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
    return (
        <>
            <header className="text-gray-400 bg-gray-950 body-font border-b border-gray-600">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to='/'>
                        <p className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-gray-700 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>

                            <span className="ml-3 text-xl">Blog App</span>
                        </p>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {username ? (
                            <>

                                <div className="relative inline-block">
                                    {/* Dropdown toggle button */}
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
                                    >
                                        <span className="mx-1">{username}</span>
                                        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown menu */}
                                    {isOpen && (
                                        <div
                                            className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Link
                                                to='/profile'
                                                className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <img
                                                    className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                                                    src={pfp}
                                                    alt="avatar"
                                                />
                                                <div className="mx-1">
                                                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{username}</h1>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                                                </div>
                                            </Link>

                                            <hr className="border-gray-200 dark:border-gray-700" />
                                            <Link to='/create'>
                                                <p

                                                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Create Post
                                                </p>
                                            </Link>
                                            <p className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                                setShowModal(true)
                                            }}>Logout</p>

                                        </div>
                                    )}
                                </div>


                            </>

                        ) : (
                            <>
                                <Link to='/login'>
                                    <p className="mr-5 hover:text-white cursor-pointer">Login</p>
                                </Link>
                                <Link to='/register'>
                                    <p className="mr-5 hover:text-white cursor-pointer">Register</p>
                                </Link>
                            </>
                        )}




                    </nav>

                </div>
                {showModal ? (
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">Logout</h2>
                                <p className="mb-6">Are you sure you want to log out?</p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => { setShowModal(false) }}
                                        className="mr-4 px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setShowModal(false)
                                        }}
                                        className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </header>

        </>

    );
}

export default Navbar;
