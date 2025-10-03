import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUserInfo } = useContext(UserContext)
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),     //sending data to backend
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();

     //localStorage.setItem('token', data.token)
      setUserInfo(data)
      

      navigate('/')


    } else {

      alert('Login Failed');
      console.log(response.body)
    }
  };


  // Login.jsx
return (
  <>
    <div className="bg-gray-950 min-h-screen flex">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex lg:w-3/5 relative bg-cover bg-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-950/70 to-transparent"></div>
        
        <div className="relative z-10 flex items-center h-full px-12 xl:px-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8 text-white" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="text-3xl font-bold text-white">Blog<span className="text-cyan-400">Hub</span></span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Back to Your Creative Space
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Join thousands of creators sharing their stories, insights, and expertise with a global audience. Your next great post awaits.
            </p>

            <div className="mt-12 flex items-center space-x-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">10K+</p>
                <p className="text-gray-400 text-sm mt-1">Active Writers</p>
              </div>
              <div className="h-12 w-px bg-gray-700"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">50K+</p>
                <p className="text-gray-400 text-sm mt-1">Articles Published</p>
              </div>
              <div className="h-12 w-px bg-gray-700"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">1M+</p>
                <p className="text-gray-400 text-sm mt-1">Monthly Readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full lg:w-2/5 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="inline-flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 text-white" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">Blog<span className="text-cyan-400">Hub</span></span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={loginUser} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-gray-700 transition-all duration-200">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm text-gray-300">Google</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-gray-700 transition-all duration-200">
              <svg className="w-5 h-5 mr-2" fill="#1DA1F2" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span className="text-sm text-gray-300">Twitter</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register">
              <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 cursor-pointer">
                Sign up for free
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
);

}

export default Login
