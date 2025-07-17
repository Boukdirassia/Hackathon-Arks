import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Heart, Bookmark, Eye } from 'lucide-react';
import { Button } from './ui/button';

/**
 * MovieCard - Interactive movie card with hover effects and action buttons
 * @param {Object} movie - Movie data (title, poster, rating, genre, etc.)
 * @param {string} size - Card size: 'small' | 'default' | 'large'
 * @param {boolean} showOverview - Show movie overview text
 * @param {boolean} disableLink - Disable navigation to movie details
 */
const MovieCard = ({ movie, size = 'default', showOverview = false, disableLink = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const sizeConfig = {
    small: { width: 'w-48', height: 'h-72' },
    default: { width: 'w-64', height: 'h-96' },
    large: { width: 'w-80', height: 'h-[28rem]' }
  };

  const currentSize = sizeConfig[size];

  const [imageError, setImageError] = useState(false);

  // Load saved interactions on component mount
  useEffect(() => {
    const interactions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    const movieInteractions = interactions[movie.id] || {};
    
    setIsLiked(movieInteractions.liked || false);
    setIsBookmarked(movieInteractions.bookmarked || false);
    setIsWatched(movieInteractions.watched || false);
  }, [movie.id]);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.style.display = 'none';
  };

  const saveInteraction = (interactionType, value) => {
    const interactions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    const movieInteractions = interactions[movie.id] || {};
    
    movieInteractions[interactionType] = value;
    movieInteractions.dateAdded = movieInteractions.dateAdded || new Date().toISOString();
    
    interactions[movie.id] = movieInteractions;
    localStorage.setItem('movieInteractions', JSON.stringify(interactions));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    saveInteraction('liked', newLikedState);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    saveInteraction('bookmarked', newBookmarkedState);
  };

  const handleWatched = (e) => {
    e.stopPropagation();
    const newWatchedState = !isWatched;
    setIsWatched(newWatchedState);
    saveInteraction('watched', newWatchedState);
  };

  const cardContent = (
    <div className={`
      group relative overflow-hidden rounded-xl
      bg-gradient-to-br from-black via-red-950 to-black
      transition-all duration-500 hover:scale-105
      shadow-lg hover:shadow-2xl hover:shadow-red-500/20
      ${disableLink ? '' : 'cursor-pointer'}
      ${currentSize.width} ${currentSize.height}
    `}>
      
      <div className="relative h-3/5 overflow-hidden rounded-t-2xl">
        {!imageError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900 via-red-950 to-black flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-6xl mb-4 text-red-500/60">🎬</div>
              <h3 className="text-white font-bold text-lg leading-tight">{movie.title}</h3>
              <p className="text-red-300 text-sm mt-2">{movie.year}</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-950/20 to-transparent" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            size="lg" 
            className="
              bg-red-600 hover:bg-red-700 text-white
              shadow-2xl backdrop-blur-sm
              transform scale-90 group-hover:scale-100
              transition-all duration-300
            "
          >
            <Play className="h-5 w-5 mr-2 fill-current" />
            Play Now
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleLike}
            className={`
              w-10 h-10 rounded-full backdrop-blur-md
              flex items-center justify-center
              transition-all duration-300 shadow-lg
              ${isLiked 
                ? 'bg-red-500/90 text-white' 
                : 'bg-white/90 text-black hover:bg-red-500 hover:text-white'
              }
            `}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleBookmark}
            className={`
              w-10 h-10 rounded-full backdrop-blur-md
              flex items-center justify-center
              transition-all duration-300 shadow-lg
              ${isBookmarked 
                ? 'bg-blue-500/90 text-white' 
                : 'bg-white/90 text-black hover:bg-blue-500 hover:text-white'
              }
            `}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleWatched}
            className={`
              w-10 h-10 rounded-full backdrop-blur-md
              flex items-center justify-center
              transition-all duration-300 shadow-lg
              ${isWatched 
                ? 'bg-green-500/90 text-white' 
                : 'bg-white/90 text-black hover:bg-red-600 hover:text-white'
              }
            `}
          >
            <Eye className={`h-4 w-4 ${isWatched ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* === RATING BADGE === */}
        <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 border border-red-500/30 shadow-lg">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-semibold">{movie.rating}</span>
        </div>
      </div>

      <div className="h-2/5 p-4 flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="
            text-white font-bold text-lg leading-tight
            line-clamp-1 group-hover:text-red-400
            transition-colors duration-300
          ">
            {movie.title}
          </h3>
          <p className="text-red-300 text-sm font-medium mt-1">
            {movie.year}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="
                text-xs bg-black/60 text-red-200
                px-2 py-1 rounded-full font-medium
                border border-red-500/40 hover:border-red-500/60
                transition-colors duration-300
              "
            >
              {genre}
            </span>
          ))}
        </div>

        {showOverview && (
          <p className="text-white/70 text-sm line-clamp-2 leading-relaxed mb-3">
            {movie.overview}
          </p>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-white/70 text-xs">{movie.rating}</span>
              </div>
            </div>
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${isWatched 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-black/50 text-white/60 border border-red-900/30'
              }
            `}>
              {isWatched ? 'Watched' : 'Not Watched'}
            </div>
          </div>
        </div>
      </div>

        <div className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-700/10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        " />
    </div>
  );

  return disableLink ? cardContent : (
    <Link to={`/movie/${movie.id}`} className="block">
      {cardContent}
    </Link>
  );
};

export default MovieCard;
