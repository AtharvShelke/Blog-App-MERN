// SidebarPost.jsx
import { Link } from 'react-router-dom';

const SidebarPost = (props) => {
  return (
    <>
      <Link to={`/blog/${props._id}`}>
        <article className="group relative bg-gradient-to-br from-gray-900 to-gray-900/50 hover:from-gray-800 hover:to-gray-900 p-5 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
          {/* Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <h3 className="font-semibold text-white text-base md:text-lg mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
            {props.title}
          </h3>

          <div className="flex items-center space-x-3">
            <img 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-800 group-hover:ring-cyan-500/30 transition-all duration-300" 
              src={props.authorPfp} 
              alt={props.author}
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-300 truncate">
                {props.author}
              </h4>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
            
            {/* Arrow Icon */}
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </article>
      </Link>
    </>
  );
};

export default SidebarPost;
