// Blog.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/getPost/${id}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
      }
    };

    getPost();
  }, [id]);

  const renderContent = (content) => {
    return parse(content, {
      replace: (domNode) => {
        if (domNode.name === 'img') {
          return (
            <div className="flex justify-center my-12">
              <img
                className="object-contain w-full max-w-4xl rounded-2xl shadow-2xl"
                src={domNode.attribs.src}
                alt={domNode.attribs.alt || 'Blog Image'}
              />
            </div>
          );
        }
        if (domNode.name === 'h2') {
          return (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">
              {domNode.children.map((child, index) => {
                if (child.name === 'strong') {
                  return <strong key={index}>{child.children[0].data}</strong>;
                } else {
                  return child.data;
                }
              })}
            </h2>
          );
        }
      },
    });
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-950 min-h-screen pt-24 pb-16">
        {error && (
          <div className="container px-4 mx-auto text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {post ? (
          <article className="container px-4 sm:px-6 mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-12 text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
                Article
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                {post.summary}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>5 min read</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-[400px] sm:h-[500px] object-cover" 
                src={post.thumbnail} 
                alt={post.title}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-6">
                {renderContent(post.content)}
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-2xl border border-gray-800">
              <div className="flex items-center space-x-6">
                <img 
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-cyan-500/20" 
                  src={post.authorPfp} 
                  alt={post.author}
                />
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Written by</p>
                  <h3 className="text-xl font-bold text-white mb-2">{post.author}</h3>
                  <p className="text-gray-400">Full-stack developer and content creator</p>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-cyan-400 mb-4"></div>
              <p className="text-gray-400">Loading article...</p>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Blog;
