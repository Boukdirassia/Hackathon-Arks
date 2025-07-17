import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';
import { 
  Search, Filter, Grid, List, Star, Calendar, 
  SlidersHorizontal, X, ChevronDown, Film, 
  TrendingUp, Clock, Award, Shuffle, ArrowLeft
} from 'lucide-react';

/**
 * MoviesDiscovery Component
 * 
 * A comprehensive movie discovery page with advanced filtering, searching, and sorting capabilities.
 * Features include:
 * - Real-time search functionality
 * - Genre filtering with multi-select
 * - Year range filtering
 * - Rating filtering
 * - Multiple sorting options
 * - Grid/List view toggle
 * - Responsive design with red/black theme
 * 
 * @component
 * @author MoBoe Team
 */
const MoviesDiscovery = () => {
  // ==================== STATE MANAGEMENT ====================
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity'); // popularity, rating, year, title
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);

  // ==================== DATA PROCESSING ====================
  
  // Get unique years from movies for year filter
  const availableYears = useMemo(() => {
    const years = [...new Set(moviesData.movies.map(movie => movie.year))];
    return years.sort((a, b) => b - a);
  }, []);

  // Get genres from JSON data
  const availableGenres = moviesData.genres;

  // Filter and sort movies based on current filters
  const filteredMovies = useMemo(() => {
    let filtered = moviesData.movies.filter(movie => {
      // Search filter
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.overview.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Genre filter
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      
      // Year filter
      const matchesYear = !selectedYear || movie.year.toString() === selectedYear;
      
      // Rating filter
      const matchesRating = movie.rating >= minRating;
      
      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
        default:
          return b.rating - a.rating; // Using rating as popularity proxy
      }
    });

    return filtered;
  }, [searchTerm, selectedGenres, selectedYear, minRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handle genre selection/deselection
   * @param {string} genre - The genre to toggle
   */
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  /**
   * Clear all filters and reset to default state
   */
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedYear('');
    setMinRating(0);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  /**
   * Get random movie recommendation
   */
  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * moviesData.movies.length);
    const randomMovie = moviesData.movies[randomIndex];
    setSearchTerm(randomMovie.title);
    setCurrentPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, selectedYear, minRating, sortBy]);

  // ==================== RENDER COMPONENT ====================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-black via-red-900/20 to-black border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4 group"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Movies</span>
              </h1>
              <p className="text-white/70 text-lg">
                Explore our collection of {moviesData.movies.length} amazing movies
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <input
                type="text"
                placeholder="Search movies by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/90 border border-white/20 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/90 hover:bg-white text-black border border-white/20 px-6"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            {/* Random Movie Button */}
            <Button
              onClick={getRandomMovie}
              className="bg-red-600 hover:bg-red-700 text-white px-6"
            >
              <Shuffle className="h-5 w-5 mr-2" />
              Random
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gradient-to-r from-red-950/50 to-black/50 border-b border-red-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Genre Filter */}
              <div>
                <label className="block text-white font-semibold mb-3">Genres</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableGenres.map(genre => (
                    <label key={genre.name} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre.name)}
                        onChange={() => handleGenreToggle(genre.name)}
                        className="w-4 h-4 text-red-600 bg-white/10 border-white/30 rounded focus:ring-red-500"
                      />
                      <span className="text-white/80 text-sm">{genre.name}</span>
                      <span className="text-white/50 text-xs">({genre.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-white font-semibold mb-3">Release Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 bg-white/90 border border-white/20 rounded-lg text-black focus:outline-none focus:border-red-500"
                >
                  <option value="">All Years</option>
                  {availableYears.map(year => (
                    <option key={year} value={year} className="bg-black text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Minimum Rating: {minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-white/50 text-xs mt-1">
                  <span>0.0</span>
                  <span>10.0</span>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-white font-semibold mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-white/90 border border-white/20 rounded-lg text-black focus:outline-none focus:border-red-500"
                >
                  <option value="popularity" className="bg-black text-white">Popularity</option>
                  <option value="rating" className="bg-black text-white">Rating</option>
                  <option value="year" className="bg-black text-white">Release Year</option>
                  <option value="title" className="bg-black text-white">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="text-white/70">
                Showing {filteredMovies.length} of {moviesData.movies.length} movies
              </div>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'All Movies'}
            </h2>
            <p className="text-white/70">
              {filteredMovies.length} movies found
              {selectedGenres.length > 0 && (
                <span> in {selectedGenres.join(', ')}</span>
              )}
            </p>
          </div>

          {/* Active Filters */}
          {(selectedGenres.length > 0 || selectedYear || minRating > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map(genre => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center"
                >
                  {genre}
                  <button
                    onClick={() => handleGenreToggle(genre)}
                    className="ml-2 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedYear && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center">
                  {selectedYear}
                  <button
                    onClick={() => setSelectedYear('')}
                    className="ml-2 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center">
                  Rating ≥ {minRating.toFixed(1)}
                  <button
                    onClick={() => setMinRating(0)}
                    className="ml-2 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Movies Grid/List */}
        {currentMovies.length > 0 ? (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard 
                    movie={movie} 
                    size={viewMode === 'list' ? 'large' : 'default'}
                    showOverview={viewMode === 'list'}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black disabled:opacity-50"
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    className={`${
                      currentPage === i + 1 
                        ? 'bg-red-600 text-white' 
                        : 'border-white/30 text-black bg-white/90 hover:bg-white hover:text-black'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-white/70 mb-6">
              Try adjusting your search criteria or clearing some filters
            </p>
            <Button
              onClick={clearAllFilters}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesDiscovery;
