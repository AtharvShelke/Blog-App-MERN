import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser'; // Import the parser
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null); // Initialize state as null
    const [error, setError] = useState(null); // Error handling state

    // Fetch post data
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/post/getPost/${id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data = await response.json(); // Parse the JSON data
                setPost(data); // Set the post data to state
            } catch (err) {
                console.error('Error fetching post:', err);
                setError(err.message); // Set the error message to state
            }
        };

        getPost(); // Trigger the fetch inside useEffect

    }, [id]); // Dependency array to trigger fetch when the `id` changes

    // Function to parse the content and wrap img tags
    const renderContent = (content) => {
        return parse(content, {
            replace: (domNode) => {
                // Check if the domNode is an img tag
                if (domNode.name === 'img') {
                    return (
                        <div className="flex justify-center mt-10 mb-10">
                            <img
                                className="object-contain w-full h-98 rounded-xl lg:w-4/5"
                                src={domNode.attribs.src} // Use the src attribute of the img tag
                                alt={domNode.attribs.alt || 'Blog Image'} // Provide an alt tag if available
                            />
                        </div>
                    );
                }
                if (domNode.name === 'h2' && domNode.children.some(child => child.name === 'strong')) {
                    return (
                        <h2 className="text-2xl font-bold text-white mt-8 ">
                            {/* Render the strong content wrapped inside */}
                            {domNode.children.map((child, index) => {
                                if (child.name === 'strong') {
                                    return <strong key={index} className="font-bold">{child.children[0].data}</strong>;
                                } else {
                                    return child.data; // Return the other text inside the h2
                                }
                            })}
                        </h2>
                    );
                }
            },
        });
    };

    // Render the post or an error message
    return (
        <>
        <Navbar/>
            <section className="bg-gray-900">
                {error && <p>{error}</p>}
                {post ? (
                    <div className="container px-3 mx-auto text-center">
                        <div className="w-11/12 lg:w-3/5 mx-auto bg-gray-900 py-5 lg:py-10 lg:px-8">
                            <h1 className="text-3xl font-semibold text-white lg:text-4xl">{post.title}</h1>
                            <img className='mx-auto mt-8 mb-6' src={post.thumbnail}/>
                            <p className="mt-6 text-gray-500 dark:text-gray-300 mb-6">{post.summary}</p>

                            {/* Render the content and wrap <img> tags */}
                            <div className="text-white">{renderContent(post.content)}</div>
                        </div>
                    </div>
                ) : (
                    <p className="h-screen">Loading...</p>
                )}
            </section>
            <Footer/>
        </>
    );
};

export default Blog;
