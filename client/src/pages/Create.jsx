import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const modules = {toolbar:[
  [{'header' : [1,2,false]}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list':'ordered'}, {'list': 'bullet'}, ],
  ['link', 'image'],
  ['clean']
]}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 
  'link', 'image'
]


const Create = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');  
  const [author, setAuthor] = useState('');
  const [authorPfp, setAuthorPfp] = useState('');
  const quillRef = useRef(null);
  const navigate = useNavigate();

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
            
            setAuthorPfp(userInfo.profileImage);
            
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    fetchUserInfo();
}, []);

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
  const fileInput = async (e) => {
    const file = e.target.files[0]
    if (file){
      const pic = await convertToBase64(file);
      setThumbnail(pic);
      
    }
  }
  const createNewPost = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/create`, {
      method:'POST',
      body:JSON.stringify({title, thumbnail, summary, content, author, authorPfp}),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      console.log(response)
      alert('Post creation failed');
    } else {
      alert('Post Created successfully');
      navigate('/');
    }
    
  }
  // Create.jsx
return (
  <>
    <Navbar />
    <section className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Info */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
              Create Content
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Share Your Story
            </h1>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Express your ideas, share your knowledge, and connect with readers around the world. Every great story starts with a single word.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Rich Text Editor</h3>
                  <p className="text-gray-400 text-sm">Format your content with our powerful editor</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Image Upload</h3>
                  <p className="text-gray-400 text-sm">Add stunning visuals to your posts</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Instant Publish</h3>
                  <p className="text-gray-400 text-sm">Go live with one click</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-4">Follow us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
                  { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/30 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-800 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Create New Post</h2>
              <p className="text-gray-400 mb-8">Fill in the details below to publish your article</p>

              <form onSubmit={createNewPost} className="space-y-6">
                {/* Title Input */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Article Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter an engaging title..."
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                    Featured Image <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-purple-500 file:text-white hover:file:shadow-lg hover:file:shadow-cyan-500/25 file:transition-all file:duration-300 file:cursor-pointer bg-gray-950 border border-gray-800 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                      onChange={(e) => fileInput(e)}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>

                {/* Summary Input */}
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-2">
                    Summary <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="summary"
                    placeholder="Brief description of your article..."
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all duration-200">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={content}
                      modules={modules}
                      formats={formats}
                      onChange={(newValue) => setContent(newValue)}
                      className="text-gray-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Publish Article
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

}

export default Create
