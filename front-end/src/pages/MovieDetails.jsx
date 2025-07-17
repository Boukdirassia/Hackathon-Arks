import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import moviesData from '../data/movies.json';
import { 
  ArrowLeft, Star, Calendar, Clock, Globe, Heart, 
  BookmarkPlus, Eye, Share2, Play, Users, Award,
  MessageCircle, ThumbsUp, ThumbsDown
} from 'lucide-react';

/**
 * MovieDetails Component
 * 
 * Displays comprehensive information about a specific movie including:
 * - Movie poster, title, and basic info
 * - Rating and user interactions (like, bookmark, watched)
 * - Detailed overview and cast information
 * - User reviews and comments section
 * - Related movies recommendations
 * - Responsive design with red/black theme
 * 
 * @component
 * @author MoBoe Team
 */
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ==================== STATE MANAGEMENT ====================
  
  // Movie data and interactions
  const [movie, setMovie] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
  // Reviews and comments
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, reviews, related

  // ==================== DATA LOADING ====================
  
  useEffect(() => {
    // Find movie by ID
    const foundMovie = moviesData.movies.find(m => m.id === parseInt(id));
    
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Load user interactions from localStorage
      const savedInteractions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
      const movieInteractions = savedInteractions[id] || {};
      
      setIsLiked(movieInteractions.liked || false);
      setIsBookmarked(movieInteractions.bookmarked || false);
      setIsWatched(movieInteractions.watched || false);
      setUserRating(movieInteractions.rating || 0);
      
      // Load reviews from localStorage
      const savedReviews = JSON.parse(localStorage.getItem('movieReviews') || '{}');
      setReviews(savedReviews[id] || []);
      
      setIsLoading(false);
    } else {
      // Movie not found, redirect to movies page
      navigate('/movies');
    }
  }, [id, navigate]);

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Save user interactions to localStorage
   */
  const saveInteractions = (interactions) => {
    const savedInteractions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    savedInteractions[id] = { ...savedInteractions[id], ...interactions };
    localStorage.setItem('movieInteractions', JSON.stringify(savedInteractions));
  };

  /**
   * Toggle like status
   */
  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    saveInteractions({ liked: newLikedState });
  };

  /**
   * Toggle bookmark status
   */
  const handleBookmark = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    saveInteractions({ bookmarked: newBookmarkedState });
  };

  /**
   * Toggle watched status
   */
  const handleWatched = () => {
    const newWatchedState = !isWatched;
    setIsWatched(newWatchedState);
    saveInteractions({ watched: newWatchedState });
  };

  /**
   * Handle user rating
   */
  const handleRating = (rating) => {
    setUserRating(rating);
    saveInteractions({ rating });
  };

  /**
   * Submit new review
   */
  const handleSubmitReview = () => {
    if (newReview.trim()) {
      const review = {
        id: Date.now(),
        text: newReview,
        rating: newRating,
        author: 'You', // In a real app, this would be the logged-in user
        date: new Date().toLocaleDateString(),
        likes: 0,
        dislikes: 0
      };
      
      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      
      // Save to localStorage
      const savedReviews = JSON.parse(localStorage.getItem('movieReviews') || '{}');
      savedReviews[id] = updatedReviews;
      localStorage.setItem('movieReviews', JSON.stringify(savedReviews));
      
      // Reset form
      setNewReview('');
      setNewRating(5);
      setShowReviewForm(false);
    }
  };

  /**
   * Get related movies (same genre)
   */
  const getRelatedMovies = () => {
    if (!movie) return [];
    
    return moviesData.movies
      .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
      .slice(0, 6);
  };

  // ==================== RENDER HELPERS ====================
  
  /**
   * Render star rating component
   */
  const renderStarRating = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star 
              className={`h-5 w-5 ${
                star <= rating 
                  ? 'text-red-400 fill-current' 
                  : 'text-white/30'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  // ==================== LOADING STATE ====================
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white/70">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null; // Will redirect in useEffect
  }

  // ==================== MAIN RENDER ====================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-black via-red-900/20 to-black border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <Link 
            to="/movies" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Movies
          </Link>
        </div>
      </div>

      {/* Movie Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-96 lg:h-[500px]">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Movie Info */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-2xl shadow-2xl shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/600';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/70 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-400" />
                    {movie.year}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-red-400" />
                    {movie.rating}/10
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-400" />
                    2h 28m {/* Placeholder duration */}
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Rating */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Your Rating</h3>
                <div className="flex items-center space-x-4">
                  {renderStarRating(userRating, true, handleRating)}
                  <span className="text-white/70">
                    {userRating > 0 ? `${userRating}/5` : 'Not rated'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleLike}
                  variant={isLiked ? 'default' : 'outline'}
                  className={`${
                    isLiked 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'border-white/30 text-black bg-white/90 hover:bg-white hover:text-black'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>

                <Button
                  onClick={handleBookmark}
                  variant={isBookmarked ? 'default' : 'outline'}
                  className={`${
                    isBookmarked 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'border-white/30 text-black bg-white/90 hover:bg-white hover:text-black'
                  }`}
                >
                  <BookmarkPlus className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>

                <Button
                  onClick={handleWatched}
                  variant={isWatched ? 'default' : 'outline'}
                  className={`${
                    isWatched 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'border-white/30 text-black bg-white/90 hover:bg-white hover:text-black'
                  }`}
                >
                  <Eye className={`h-5 w-5 mr-2 ${isWatched ? 'fill-current' : ''}`} />
                  {isWatched ? 'Watched' : 'Mark as Watched'}
                </Button>

                <Button
                  variant="outline"
                  className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-8 border-b border-white/10 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Globe },
            { id: 'reviews', label: 'Reviews', icon: MessageCircle },
            { id: 'related', label: 'Related', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-white'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Cast & Crew (Placeholder) */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Cast & Crew</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {['Director: Christopher Nolan', 'Writer: Christopher Nolan', 'Stars: Matthew McConaughey', 'Producer: Emma Thomas'].map((credit, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-white/80 text-sm">{credit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Reviews ({reviews.length})</h2>
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Write Review
                </Button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-4">Write Your Review</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">Rating</label>
                      <div className="flex items-center space-x-4">
                        {renderStarRating(newRating, true, setNewRating)}
                        <span className="text-white/70">{newRating}/5</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2">Review</label>
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Share your thoughts about this movie..."
                        className="w-full h-32 p-4 bg-white/90 border border-white/20 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={handleSubmitReview}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Submit Review
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-4 mb-2">
                            <h4 className="text-white font-semibold">{review.author}</h4>
                            {renderStarRating(review.rating)}
                          </div>
                          <p className="text-white/60 text-sm">{review.date}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-4">{review.text}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{review.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
                    <p className="text-white/70">Be the first to review this movie!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Movies Tab */}
          {activeTab === 'related' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Related Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRelatedMovies().map((relatedMovie) => (
                  <Link
                    key={relatedMovie.id}
                    to={`/movie/${relatedMovie.id}`}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                      <img
                        src={relatedMovie.poster}
                        alt={relatedMovie.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/300/400';
                        }}
                      />
                      <h3 className="text-white font-semibold mb-2 group-hover:text-red-400 transition-colors">
                        {relatedMovie.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">{relatedMovie.year}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-red-400 mr-1" />
                          <span className="text-white/70 text-sm">{relatedMovie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
