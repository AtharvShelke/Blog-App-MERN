import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import footer_img from '../assets/pfp.jpg';
const Footer = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d58af696-1dca-478f-abe3-4a94d0151469");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
 // Footer.jsx
return (
  <footer className="relative bg-gray-950 border-t border-gray-800">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(100, 100, 100) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
    </div>

    <div className="relative container px-4 sm:px-6 lg:px-8 py-16 mx-auto max-w-7xl">
      {/* Contact Header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
          Get In Touch
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or just want to say hello? Drop us a message and we'll get back to you soon.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
        
        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="msg" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="msg"
                  name="msg"
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Email Card */}
          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-sm text-gray-400 mb-3">Let's discuss your project</p>
            <a href="mailto:shelkeatharv964@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm font-medium">
              shelkeatharv@gmail.com
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg enableBackground="new 0 0 32 32" height="24px" width="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400" fill="currentColor">
                <path d="M4.983,8.875H4.94C2.657,8.875,1,7.361,1,5.275c0-2.089,1.692-3.606,4.023-3.606c2.292,0,3.928,1.476,3.977,3.589C9,7.359,7.311,8.875,4.983,8.875z M5.023,2.669C3.243,2.669,2,3.741,2,5.275c0,1.531,1.209,2.601,2.94,2.601h0.043C6.76,7.875,8,6.804,8,5.27C7.963,3.694,6.795,2.669,5.023,2.669z"/>
                <path d="M7.5,29h-5C2.224,29,2,28.776,2,28.5v-18C2,10.224,2.224,10,2.5,10h5C7.776,10,8,10.224,8,10.5v18C8,28.776,7.776,29,7.5,29z M3,28h4V11H3V28z"/>
                <path d="M30.5,29h-6c-0.276,0-0.5-0.224-0.5-0.5V19c0-1.654-1.346-3-3-3s-3,1.346-3,3v9.5c0,0.276-0.224,0.5-0.5,0.5h-6c-0.276,0-0.5-0.224-0.5-0.5v-18c0-0.276,0.224-0.5,0.5-0.5h6c0.276,0,0.5,0.224,0.5,0.5v3.014c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5V11h-5v17h5v-9c0-2.206,1.794-4,4-4s4,1.794,4,4v9h5V17.5c0-3.584-2.916-6.5-6.5-6.5c-1.384,0-2.722,0.406-3.871,1.173c-0.229,0.152-0.54,0.092-0.693-0.138s-0.092-0.54,0.139-0.693C20.388,10.464,21.918,10,23.5,10c4.136,0,7.5,3.364,7.5,7.5v11C31,28.776,30.776,29,30.5,29z"/>
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
            <p className="text-sm text-gray-400 mb-3">Connect professionally</p>
            <a href="https://www.linkedin.com/in/atharv-shelke" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm font-medium">
              Atharv Shelke
            </a>
          </div>

          {/* Instagram Card */}
          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="currentColor" className="text-cyan-400" viewBox="0 0 512 512">
                <path d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294z"/>
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">Instagram</h3>
            <p className="text-sm text-gray-400 mb-3">Follow for updates</p>
            <a href="https://www.instagram.com/atharv._.964/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm font-medium">
              @atharv._.964
            </a>
          </div>

          {/* GitHub Card */}
          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640" fill="currentColor" className="text-cyan-400">
                <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/>
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
            <p className="text-sm text-gray-400 mb-3">Check out my work</p>
            <a href="https://github.com/AtharvShelke" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm font-medium">
              Atharv Shelke
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-12"></div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <a href="https://atharv-shelke.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <img 
              src={footer_img} 
              alt="Atharv Shelke" 
              className="relative w-12 h-12 rounded-full object-cover ring-2 ring-gray-800 group-hover:ring-cyan-500/50 transition-all duration-300"
            />
          </div>
          <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
            Atharv Shelke
          </span>
        </a>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} All Rights Reserved. Made with 
          <span className="text-red-500 mx-1">❤</span> 
          by Atharv
        </p>
      </div>
    </div>
  </footer>
);

}

export default Footer