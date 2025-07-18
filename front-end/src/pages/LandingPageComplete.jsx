import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';
import { 
  Play, Star, Film, Heart, Users, Mail, Twitter, Facebook, Instagram, Search, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Landing Page Component - Page d'accueil de MoBoe
 * 
 * Fonctionnalités principales :
 * - Section héro avec vidéo
 * - Films populaires
 * - Genres de films
 * - Témoignages utilisateurs
 */
const LandingPageComplete = () => {
  // État pour gérer la vidéo de fond
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Données des témoignages utilisateurs
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Movie Enthusiast",
      content: "MoBoe has completely changed how I discover movies!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Film Critic",
      content: "Perfect for film critics and movie lovers.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Casual Viewer",
      content: "Finally, a platform that understands my taste!",
      rating: 5,
      avatar: "ED"
    }
  ];

  // Récupération des données d'authentification
  const { user, loading, logout } = useAuth();
  
  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black/50 to-red-800/30"></div>
          
          <video
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-60' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
          >
            <source src="/api/placeholder/1920/1080" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-red-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-red-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-red-800/30"></div>
        </div>

        {/* Futuristic Floating Navigation */}
        <nav className="relative z-20 p-6 lg:px-12">
          <div className="relative">
            {/* Main Navigation Container */}
            <div className="flex items-center justify-between">
              
              {/* Creative Logo Design */}
              <div className="relative group cursor-pointer">
                {/* Hexagonal Background */}
                <div className="absolute -inset-3 opacity-60 group-hover:opacity-80 transition-all duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-red-500/30 via-red-600/40 to-red-700/30 transform rotate-12 rounded-xl blur-lg"></div>
                </div>
                
                {/* Main Logo Container */}
                <div className="relative flex items-center space-x-4">
                  {/* Geometric Icon Design */}
                  <div className="relative">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 w-12 h-12 border-2 border-red-500/40 rounded-full animate-spin-slow"></div>
                    
                    {/* Inner Hexagon */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="absolute inset-2 bg-gradient-to-br from-red-500 to-red-700 transform rotate-45 rounded-lg group-hover:rotate-90 transition-transform duration-500"></div>
                      <div className="absolute inset-3 bg-gradient-to-tl from-red-600 to-red-800 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                      
                      {/* Center Icon */}
                      <div className="relative z-10">
                        <Film className="h-5 w-5 text-white group-hover:text-red-200 transition-colors duration-300" />
                      </div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                  </div>
                  
                  {/* Brand Typography */}
                  <div className="flex flex-col">
                    {/* Main Brand Name */}
                    <div className="relative">
                      <h1 className="text-2xl font-black text-white group-hover:text-red-400 transition-all duration-300 tracking-tight">
                        Mo<span className="text-red-500 group-hover:text-red-300">Boe</span>
                      </h1>
                      {/* Underline Effect */}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-500"></div>
                    </div>
                    
                    {/* Tagline */}
                    <div className="flex items-center space-x-1 mt-0.5">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-red-400/70 font-semibold tracking-widest uppercase">
                        Cinema
                      </p>
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Navigation Pills */}
              <div className="hidden md:flex items-center space-x-2">
                {/* Navigation Background */}
                <div className="relative bg-black/30 backdrop-blur-lg border border-red-500/20 rounded-full px-2 py-2 shadow-xl">
                  <div className="flex items-center space-x-1">
                    
                    <Link to="/" className="group relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                      <div className="relative px-4 py-2 text-white/80 group-hover:text-white font-medium transition-all duration-300">
                        Home
                      </div>
                    </Link>
                    
                    <Link to="/movies" className="group relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                      <div className="relative px-4 py-2 text-white/80 group-hover:text-white font-medium transition-all duration-300">
                        Movies List
                      </div>
                    </Link>
                    
                    <Link to="/watchlist" className="group relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                      <div className="relative px-4 py-2 text-white/80 group-hover:text-white font-medium transition-all duration-300">
                        My Space
                      </div>
                    </Link>
                    
                    <a href="#" className="group relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                      <div className="relative px-4 py-2 text-white/80 group-hover:text-white font-medium transition-all duration-300">
                        About
                      </div>
                    </a>
                    
                  </div>
                </div>
              </div>
              
              {/* Floating Action Button */}
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                
                {/* Button */}
                <Button className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl border border-red-400/30 transition-all duration-300 group overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Button Content */}
                  <div onClick={() => logout()} className="relative flex items-center space-x-2">
                    <div className="p-1 bg-white/20 rounded-full">
                      <Users className="h-3 w-3" />
                    </div>
                    <span  className="text-sm font-bold">Sign out</span>
                  </div>
                </Button> 
              </div>
              
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-40"></div>
            <div className="absolute top-2 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-t from-red-500/50 to-transparent"></div>
            
          </div>
        </nav>

        <div className="relative z-10 flex items-center min-h-[calc(100vh-100px)] px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                  Next Favorite
                </span>
                Movie
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                Explore thousands of movies, create your watchlist, and discover hidden gems 
                with our intelligent recommendation system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/movies">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
                    <Play className="mr-2 h-5 w-5" />
                    Start Exploring
                  </Button>
                </Link>
                <Link to="/movies">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-black bg-white/90 hover:bg-white hover:text-black px-8 py-4 text-lg w-full sm:w-auto"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Discover Movies
                  </Button>
                </Link>
              </div>
            </div>


          </div>
        </div>



        <div className="absolute top-1/4 right-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-red-600/15 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-red-400/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-red-700/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-red-300/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>



      {/* ==================== GENRE EXPLORATION SECTION ==================== */}
      <section className="relative py-24 bg-gradient-to-b from-red-950 via-black to-red-900 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          {/* Animated mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-800/20 animate-pulse"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-tl from-red-400/8 to-red-700/4 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-600/10 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Enhanced Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-red-500/20 via-red-600/15 to-red-500/20 border border-red-500/30 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-3"></div>
              <Film className="w-5 h-5 text-red-400 mr-3 animate-pulse" />
              <span className="text-red-300 text-sm font-bold tracking-widest uppercase">Cinematic Universe</span>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse ml-3"></div>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Explore by{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-500 to-red-700 animate-pulse">
                  Genre
                </span>
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full opacity-50 blur-sm"></div>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
              </span>
            </h2>
            
            <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-4">
              Immerse yourself in our{' '}
              <span className="text-red-300 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                {moviesData.movies.length} handpicked movies
              </span>
              {' '}across every genre imaginable
            </p>
            
            <div className="flex justify-center items-center space-x-2 text-red-400/60">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-400/60"></div>
              <div className="w-2 h-2 bg-red-400/60 rounded-full animate-pulse"></div>
              <div className="w-16 h-px bg-red-400/60"></div>
              <div className="w-2 h-2 bg-red-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-400/60"></div>
            </div>
          </div>
          
          {/* Revolutionary Genre Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {moviesData.genres.map((genre, index) => {
              // Genre-specific icons and colors
              const genreConfig = {
                'Action': { icon: '⚡', gradient: 'from-red-600 to-orange-600', shadow: 'shadow-red-500/50' },
                'Drama': { icon: '🎭', gradient: 'from-red-500 to-purple-600', shadow: 'shadow-purple-500/50' },
                'Sci-Fi': { icon: '🚀', gradient: 'from-red-400 to-blue-600', shadow: 'shadow-blue-500/50' },
                'Crime': { icon: '🔫', gradient: 'from-red-700 to-gray-800', shadow: 'shadow-gray-500/50' },
                'Thriller': { icon: '🔪', gradient: 'from-red-600 to-red-900', shadow: 'shadow-red-600/50' },
                'Adventure': { icon: '🗺️', gradient: 'from-red-500 to-green-600', shadow: 'shadow-green-500/50' },
                'Romance': { icon: '💕', gradient: 'from-red-400 to-pink-600', shadow: 'shadow-pink-500/50' },
                'Comedy': { icon: '😂', gradient: 'from-red-400 to-yellow-500', shadow: 'shadow-yellow-500/50' }
              };
              
              const config = genreConfig[genre.name] || { icon: '🎬', gradient: 'from-red-500 to-red-700', shadow: 'shadow-red-500/50' };
              
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* 3D Card Container */}
                  <div className="relative h-48 bg-gradient-to-br from-black/80 via-red-950/60 to-black/90 backdrop-blur-sm border border-red-500/30 rounded-3xl overflow-hidden group-hover:border-red-400/60 transition-all duration-500">
                    
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                    
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 ${config.shadow}`}></div>
                    
                    {/* Floating particles inside card */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-all duration-700"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random()}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                      
                      {/* Genre Icon with 3D effect */}
                      <div className="mb-4 relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/40 backdrop-blur-sm border border-red-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-2xl">
                          <span className="text-2xl filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500">
                            {config.icon}
                          </span>
                        </div>
                        
                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-red-400/20 group-hover:border-red-300/60 group-hover:rotate-180 transition-all duration-1000"></div>
                      </div>
                      
                      {/* Genre Name */}
                      <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-200 transition-all duration-300 tracking-wide">
                        {genre.name}
                      </h3>
                      
                      {/* Movie Count with enhanced styling */}
                      <div className="relative">
                        <div className="bg-gradient-to-r from-black/60 via-red-950/40 to-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-red-500/40 group-hover:border-red-400/70 transition-all duration-300">
                          <p className="text-red-300 font-bold text-sm tracking-wider">
                            <span className="text-red-400 text-lg font-black">{genre.count}</span> films
                          </p>
                        </div>
                        
                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-red-500/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 blur-sm"></div>
                      </div>
                      
                      {/* Hover arrow indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ChevronRight className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/40 group-hover:border-red-300/80 transition-all duration-300"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/40 group-hover:border-red-300/80 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <Link to="/movies">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 text-lg rounded-2xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
              >
                <Search className="mr-3 h-5 w-5" />
                Explore All Movies
                <ChevronRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== POPULAR MOVIES SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-red-950 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Movies</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the most popular movies loved by our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8 max-w-6xl mx-auto">
            {moviesData.movies.slice(0, 8).map((movie, index) => (
              <div
                key={movie.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} size="default" showOverview={false} disableLink={true} />
              </div>
            ))}
          </div>
          

        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-black to-red-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Users Say</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join thousands of movie lovers who trust MoBoe for their entertainment needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-red-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-red-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              MoBoe <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Pricing</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Choose the perfect plan for your movie experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-red-500/30 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
              <div className="text-4xl font-bold text-white mb-6">
                Free
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Originals</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Switch plans anytime</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/50 line-through">Download and watch anytime</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/50 line-through">Live TV in Full HD</span>
                </div>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold">
                REGISTER NOW
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center hover:border-red-500/50 transition-all duration-300 hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">POPULAR</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $25.99 <span className="text-lg text-white/60">/month</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Originals</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Switch plans anytime</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Download and watch offline</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">No ad interruptions</span>
                </div>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold">
                REGISTER NOW
              </Button>
            </div>

            {/* VIP Plan */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-red-500/30 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-2">VIP</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $45.99 <span className="text-lg text-white/60">/month</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Originals</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Switch plans anytime</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">No ad interruptions</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/80">Up to 20 devices</span>
                </div>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold">
                REGISTER NOW
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER SECTION ==================== */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Film className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold text-white">MoBoe</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Your ultimate destination for movie discovery, reviews, and recommendations. 
                Join our community of film enthusiasts today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Browse Movies</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Top Rated</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">New Releases</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Watchlist</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 MoBoe. All rights reserved. Built with ❤️ for movie lovers.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Mail className="h-4 w-4 text-white/60" />
              <span className="text-white/60 text-sm">hello@moboe.com</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPageComplete;
