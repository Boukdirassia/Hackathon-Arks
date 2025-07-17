import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';
import { 
  Bookmark, Heart, Eye, Trash2, Filter, 
  Grid3X3, List, Search, Calendar, Star,
  BookmarkX, HeartOff, EyeOff, Play, ArrowLeft
} from 'lucide-react';

/**
 * Watchlist Component
 * 
 * Manages user's personal movie collections:
 * - Bookmarked movies (watchlist)
 * - Liked movies
 * - Watched movies
 * - User ratings and reviews
 * 
 * Features:
 * - Filter by collection type
 * - Search within collections
 * - Sort by various criteria
 * - Grid/List view toggle
 * - Bulk actions (remove multiple items)
 * - Statistics and insights
 * 
 * @component
 * @author MoBoe Team
 */
const Watchlist = () => {
  // ==================== STATE MANAGEMENT ====================
  
  // Collections data
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  
  // UI state
  const [activeTab, setActiveTab] = useState('bookmarked'); // bookmarked, liked, watched, rated
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded'); // dateAdded, title, year, rating
  const [viewMode, setViewMode] = useState('list'); // grid, list
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // ==================== DATA LOADING ====================
  
  useEffect(() => {
    loadUserCollections();
  }, []);

  /**
   * Load user collections from localStorage
   */
  const loadUserCollections = () => {
    const interactions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '{}');
    
    const bookmarked = [];
    const liked = [];
    const watched = [];
    const rated = [];
    
    // Process each movie interaction
    Object.entries(interactions).forEach(([movieId, interaction]) => {
      const movie = moviesData.movies.find(m => m.id === parseInt(movieId));
      if (movie) {
        const movieWithDate = {
          ...movie,
          dateAdded: interaction.dateAdded || new Date().toISOString(),
          userRating: interaction.rating || 0
        };
        
        if (interaction.bookmarked) bookmarked.push(movieWithDate);
        if (interaction.liked) liked.push(movieWithDate);
        if (interaction.watched) watched.push(movieWithDate);
        if (interaction.rating > 0) rated.push(movieWithDate);
      }
    });
    
    setBookmarkedMovies(bookmarked);
    setLikedMovies(liked);
    setWatchedMovies(watched);
    setRatedMovies(rated);
  };

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Get current collection based on active tab
   */
  const getCurrentCollection = () => {
    switch (activeTab) {
      case 'bookmarked': return bookmarkedMovies;
      case 'liked': return likedMovies;
      case 'watched': return watchedMovies;
      case 'rated': return ratedMovies;
      default: return [];
    }
  };

  /**
   * Filter and sort current collection
   */
  const getFilteredAndSortedMovies = () => {
    let movies = getCurrentCollection();
    
    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      movies = movies.filter(movie => {
        try {
          return (
            (movie.title && movie.title.toLowerCase().includes(searchLower)) ||
            (movie.overview && movie.overview.toLowerCase().includes(searchLower)) ||
            (movie.genre && Array.isArray(movie.genre) && movie.genre.some(g => g && g.toLowerCase().includes(searchLower))) ||
            (movie.year && movie.year.toString().includes(searchLower))
          );
        } catch (error) {
          console.warn('Error filtering movie:', movie, error);
          return false;
        }
      });
    }
    
    // Apply sorting
    movies.sort((a, b) => {
      try {
        switch (sortBy) {
          case 'title':
            return (a.title || '').localeCompare(b.title || '');
          case 'year':
            return (b.year || 0) - (a.year || 0);
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'userRating':
            return (b.userRating || 0) - (a.userRating || 0);
          case 'dateAdded':
          default:
            const dateA = new Date(a.dateAdded || 0);
            const dateB = new Date(b.dateAdded || 0);
            return dateB - dateA;
        }
      } catch (error) {
        console.warn('Error sorting movies:', error);
        return 0;
      }
    });
    
    return movies;
  };

  /**
   * Get statistics for current collection
   */
  const getCollectionStats = () => {
    const movies = getCurrentCollection();
    const totalMovies = movies.length;
    const totalHours = totalMovies * 2.5; // Average movie length
    const averageRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies || 0;
    const genreCount = {};
    
    movies.forEach(movie => {
      movie.genre.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    
    const topGenre = Object.entries(genreCount).sort(([,a], [,b]) => b - a)[0];
    
    return {
      totalMovies,
      totalHours: Math.round(totalHours * 10) / 10,
      averageRating: Math.round(averageRating * 10) / 10,
      topGenre: topGenre ? topGenre[0] : 'None'
    };
  };

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Remove movie from current collection
   */
  const removeFromCollection = (movieId) => {
    const interactions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    
    if (interactions[movieId]) {
      switch (activeTab) {
        case 'bookmarked':
          interactions[movieId].bookmarked = false;
          break;
        case 'liked':
          interactions[movieId].liked = false;
          break;
        case 'watched':
          interactions[movieId].watched = false;
          break;
        case 'rated':
          interactions[movieId].rating = 0;
          break;
      }
      
      localStorage.setItem('movieInteractions', JSON.stringify(interactions));
      loadUserCollections();
    }
  };

  /**
   * Handle bulk actions
   */
  const handleBulkAction = (action) => {
    const interactions = JSON.parse(localStorage.getItem('movieInteractions') || '{}');
    
    selectedMovies.forEach(movieId => {
      if (interactions[movieId]) {
        switch (action) {
          case 'remove':
            switch (activeTab) {
              case 'bookmarked':
                interactions[movieId].bookmarked = false;
                break;
              case 'liked':
                interactions[movieId].liked = false;
                break;
              case 'watched':
                interactions[movieId].watched = false;
                break;
              case 'rated':
                interactions[movieId].rating = 0;
                break;
            }
            break;
        }
      }
    });
    
    localStorage.setItem('movieInteractions', JSON.stringify(interactions));
    setSelectedMovies([]);
    setShowBulkActions(false);
    loadUserCollections();
  };

  /**
   * Toggle movie selection for bulk actions
   */
  const toggleMovieSelection = (movieId) => {
    setSelectedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // ==================== RENDER HELPERS ====================
  
  /**
   * Render collection tabs
   */
  const renderTabs = () => {
    const tabs = [
      { id: 'bookmarked', label: 'Watchlist', icon: Bookmark, count: bookmarkedMovies.length },
      { id: 'liked', label: 'Liked', icon: Heart, count: likedMovies.length },
      { id: 'watched', label: 'Watched', icon: Eye, count: watchedMovies.length },
      { id: 'rated', label: 'Rated', icon: Star, count: ratedMovies.length }
    ];

    return (
      <div className="flex space-x-1 bg-white/5 rounded-xl p-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedMovies([]);
              setShowBulkActions(false);
              setSearchTerm(''); // Clear search when switching tabs
            }}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-white/70 hover:text-black hover:bg-white/90'
              }
            `}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
            <span className={`
              px-2 py-1 rounded-full text-xs font-bold
              ${activeTab === tab.id ? 'bg-white/20' : 'bg-red-600/20 text-red-400'}
            `}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    );
  };

  /**
   * Render collection statistics
   */
  const renderStats = () => {
    const stats = getCollectionStats();
    
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-white mb-1">{stats.totalMovies}</div>
          <div className="text-white/70 text-sm">Total Movies</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-white mb-1">{stats.totalHours}h</div>
          <div className="text-white/70 text-sm">Watch Time</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-white mb-1">{stats.averageRating}</div>
          <div className="text-white/70 text-sm">Avg Rating</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-white mb-1">{stats.topGenre}</div>
          <div className="text-white/70 text-sm">Top Genre</div>
        </div>
      </div>
    );
  };

  /**
   * Render empty state
   */
  const renderEmptyState = () => {
    const emptyStates = {
      bookmarked: {
        icon: BookmarkX,
        title: 'No movies in your watchlist',
        description: 'Start building your watchlist by bookmarking movies you want to watch later.',
        action: 'Browse Movies'
      },
      liked: {
        icon: HeartOff,
        title: 'No liked movies yet',
        description: 'Like movies you enjoy to keep track of your favorites.',
        action: 'Discover Movies'
      },
      watched: {
        icon: EyeOff,
        title: 'No watched movies',
        description: 'Mark movies as watched to track your viewing history.',
        action: 'Find Movies'
      },
      rated: {
        icon: Star,
        title: 'No rated movies',
        description: 'Rate movies to help others discover great films.',
        action: 'Rate Movies'
      }
    };

    const state = emptyStates[activeTab];
    
    return (
      <div className="text-center py-16">
        <state.icon className="h-24 w-24 text-white/30 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">{state.title}</h3>
        <p className="text-white/70 mb-8 max-w-md mx-auto">{state.description}</p>
        <Link to="/movies">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Play className="h-5 w-5 mr-2" />
            {state.action}
          </Button>
        </Link>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  
  const filteredMovies = getFilteredAndSortedMovies();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-red-900/20 to-black border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Collections</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Manage your personal movie collections and track your cinematic journey
            </p>
          </div>
          
          {/* Tabs */}
          {renderTabs()}
          
          {/* Stats */}
          {renderStats()}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {getCurrentCollection().length > 0 ? (
          <>
            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search in collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 border border-white/20 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/90 border border-white/20 rounded-lg text-black focus:outline-none focus:border-red-500"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="title">Title</option>
                  <option value="year">Year</option>
                  <option value="rating">Rating</option>
                  {activeTab === 'rated' && <option value="userRating">Your Rating</option>}
                </select>

                {/* View Mode */}
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                {/* Bulk Actions */}
                <Button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  variant="outline"
                  className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Select
                </Button>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {showBulkActions && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-white/70">
                      {selectedMovies.length} selected
                    </span>
                    <Button
                      onClick={() => setSelectedMovies(filteredMovies.map(m => m.id))}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
                    >
                      Select All
                    </Button>
                    <Button
                      onClick={() => setSelectedMovies([])}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
                    >
                      Clear
                    </Button>
                  </div>
                  
                  {selectedMovies.length > 0 && (
                    <Button
                      onClick={() => handleBulkAction('remove')}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Selected
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Movies Grid/List */}
            {filteredMovies.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
                }
              `}>
                {filteredMovies.map((movie) => (
                <div key={movie.id} className="relative">
                  {showBulkActions && (
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedMovies.includes(movie.id)}
                        onChange={() => toggleMovieSelection(movie.id)}
                        className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-red-600 checked:border-red-600 focus:ring-red-500"
                      />
                    </div>
                  )}
                  
                  {viewMode === 'grid' ? (
                    <div className="relative">
                      <MovieCard movie={movie} showOverview={false} />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCollection(movie.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-red-500/40 transition-all">
                      <div className="flex items-center space-x-4">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/100/150';
                          }}
                        />
                        <div className="flex-1">
                          <Link to={`/movie/${movie.id}`} className="block hover:text-red-400 transition-colors">
                            <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                          </Link>
                          <p className="text-white/70 text-sm mb-2">{movie.year} • {movie.genre.join(', ')}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-red-400 mr-1" />
                              <span className="text-white/70 text-sm">{movie.rating}</span>
                            </div>
                            {movie.userRating > 0 && (
                              <div className="flex items-center">
                                <span className="text-white/70 text-sm">Your rating: {movie.userRating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => removeFromCollection(movie.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* No search results */
            <div className="text-center py-16">
              <Search className="h-24 w-24 text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No movies found</h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                No movies match your search "{searchTerm}". Try a different search term.
              </p>
              <Button 
                onClick={() => setSearchTerm('')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Clear Search
              </Button>
            </div>
          )}
        </>
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default Watchlist;
