// Post.jsx
import { Link } from 'react-router-dom';

const Post = (props) => {
  return (
    <>
      <Link to={`/blog/${props._id}`}>
        <article className="group relative bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
              src={props.thumbnail} 
              alt={props.title}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            
            {/* Category Badge (Optional) */}
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-cyan-400 uppercase bg-cyan-500/10 backdrop-blur-md rounded-full border border-cyan-500/20">
              Featured
            </span>
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
              {props.title}
            </h2>

            <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
              {props.summary}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-3">
                <img 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-800 group-hover:ring-cyan-500/30 transition-all duration-300" 
                  src={props.authorPfp} 
                  alt={props.author}
                />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-300">{props.author}</h3>
                  <p className="text-xs text-gray-500">5 min read</p>
                </div>
              </div>
              
              {/* Read More Arrow */}
              <div className="flex items-center space-x-2 text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-sm font-medium">Read</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

export default Post;
