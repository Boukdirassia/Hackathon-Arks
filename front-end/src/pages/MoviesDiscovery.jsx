import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';
import { Search, Filter, Grid, List, X, Film, Shuffle, ArrowLeft } from 'lucide-react';

const MoviesDiscovery = () => {
  // Basic state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  // Get available genres
  const availableGenres = moviesData.genres;

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = moviesData.movies.filter(movie => {
      // Check if movie matches search term
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Check if movie matches selected genres
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      
      return matchesSearch && matchesGenre;
    });

    // Sort movies based on selected option
    filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.rating - a.rating; // default
    });

    return filtered;
  }, [searchTerm, selectedGenres, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

  // Handle genre selection
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSortBy('rating');
    setCurrentPage(1);
  };

  // Get random movie
  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * moviesData.movies.length);
    const randomMovie = moviesData.movies[randomIndex];
    setSearchTerm(randomMovie.title);
    setCurrentPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover <span className="text-red-400">Movies</span>
          </h1>
          
          <p className="text-white/70 text-lg">
            Explore our collection of movies. Search, filter, and discover your favorites.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/90 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="year">Sort by Year</option>
              <option value="title">Sort by Title</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-white/10 border border-white/20 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-white/70'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'text-white/70'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Random Movie Button */}
            <Button
              onClick={getRandomMovie}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <Shuffle className="h-5 w-5" />
              Random
            </Button>
          </div>
        </div>

        {/* Genre Filters */}
        <div className="mb-8">
          <h3 className="text-white text-lg font-semibold mb-4">Filter by Genre</h3>
          <div className="flex flex-wrap gap-3">
            {availableGenres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => handleGenreToggle(genre.name)}
                className={`px-4 py-2 rounded-full border ${
                  selectedGenres.includes(genre.name)
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedGenres.length > 0) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5 text-white/70" />
              <span className="text-white/70">Active Filters:</span>
              <Button
                onClick={clearAllFilters}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center"
                >
                  {genre}
                  <button onClick={() => handleGenreToggle(genre)} className="ml-2">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70">
            Showing {currentMovies.length} of {filteredMovies.length} movies
          </p>
        </div>

        {/* Movies Display */}
        {currentMovies.length > 0 ? (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentMovies.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie} 
                  size={viewMode === 'list' ? 'large' : 'default'}
                  showOverview={viewMode === 'list'}
                />
              ))}
            </div>

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white/90 text-black hover:bg-white disabled:opacity-50"
                >
                  Previous
                </Button>
                
                <span className="text-white px-4">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-white/90 text-black hover:bg-white disabled:opacity-50"
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
              Try adjusting your search or clearing filters
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
