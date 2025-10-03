import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState({myFile:''});
  const navigate = useNavigate();


  const register = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({ username, email, profileImage, password, confirmPassword }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      alert('Registration Failed')
      console.log(response)
    }
    else {
      alert('Registration Successfull')

      navigate('/login')
    }


  }

  const fileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setProfileImage(base64);
      console.log(profileImage)
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  // Register.jsx
return (
  <>
    <section className="bg-gray-950 min-h-screen flex">
      {/* Left Side - Image */}
      <div
        className="hidden lg:block lg:w-2/5 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80')"
        }}
      >
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="text-center px-12">
            <div className="inline-flex p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12 text-white" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-white/80 text-lg">Start your journey as a content creator today</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full lg:w-3/5 px-6 py-12">
        <div className="w-full max-w-xl">
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

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">Create Account</h1>
            <p className="text-gray-400">Join thousands of creators sharing their stories</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={register} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Profile Picture */}
            <div>
              <label htmlFor="pfp" className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                id="pfp"
                accept="image/*"
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-purple-500 file:text-white hover:file:shadow-lg hover:file:shadow-cyan-500/25 file:transition-all file:duration-300 file:cursor-pointer bg-gray-900 border border-gray-800 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                onChange={(e) => fileInput(e)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-cyan-500 bg-gray-900 border-gray-800 rounded focus:ring-cyan-500 focus:ring-2"
                required
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 cursor-pointer">
                Sign in here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  </>
);

}

export default Register
