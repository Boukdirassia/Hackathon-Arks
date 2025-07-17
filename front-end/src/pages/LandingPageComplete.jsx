import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';
import { 
  Play, Star, TrendingUp, Users, Film, Search, Heart, BookmarkPlus, 
  Award, Zap, Globe, Mail, Twitter, Facebook, Instagram 
} from 'lucide-react';

const LandingPageComplete = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get featured movies from JSON data
  const featuredMovies = moviesData.featuredMovies.map(id => 
    moviesData.movies.find(movie => movie.id === id)
  );

  const stats = [
    { icon: Film, value: "10K+", label: "Movies" },
    { icon: Users, value: "50K+", label: "Users" },
    { icon: Star, value: "4.8", label: "Rating" },
    { icon: TrendingUp, value: "99%", label: "Uptime" }
  ];

  // Get movie categories from JSON data with icons
  const movieCategories = moviesData.genres.map(genre => ({
    ...genre,
    icon: genre.name === 'Action' ? Zap :
          genre.name === 'Drama' ? Heart :
          genre.name === 'Comedy' ? Star :
          genre.name === 'Thriller' ? Film :
          genre.name === 'Sci-Fi' ? Globe :
          genre.name === 'Romance' ? Heart : Film
  }));

  const features = [
    {
      icon: BookmarkPlus,
      title: "Smart Watchlists",
      description: "Create and organize your movie watchlists with AI-powered recommendations"
    },
    {
      icon: Award,
      title: "Expert Reviews",
      description: "Get insights from professional critics and community ratings"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access movies from around the world with our comprehensive database"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Find your next favorite movie with our advanced search and filters"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Movie Enthusiast",
      content: "MoBoe has completely changed how I discover movies. The recommendations are spot-on!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Film Critic",
      content: "As a professional critic, I love the detailed analytics and community features.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Casual Viewer",
      content: "Finally, a platform that understands my taste in movies. Absolutely love it!",
      rating: 5,
      avatar: "ED"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900 animate-pulse"></div>
          
          <video
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-30' : 'opacity-0'
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
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-pink-900/20"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-white">MoBoe</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Movies</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Series</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
            Sign In
          </Button>
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
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Movies
                </Button>
              </div>
            </div>

            <div className="backdrop-blur-fallback rounded-2xl p-6 border border-white/20 animate-slide-in-up hover:border-red-500/30 transition-all duration-300">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <Film className="h-5 w-5 mr-2 text-red-500" />
                Featured This Week
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white text-xl font-bold mb-2 animate-glow">
                    {featuredMovies[currentSlide].title}
                  </h4>
                  <p className="text-white/70 mb-3 leading-relaxed">
                    {featuredMovies[currentSlide].overview}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold text-sm">
                        {featuredMovies[currentSlide].rating}
                      </span>
                    </div>
                    <span className="text-white/60 bg-white/10 px-2 py-1 rounded-full text-sm">
                      {featuredMovies[currentSlide].year}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {featuredMovies[currentSlide].genre.slice(0, 2).map((genre, index) => (
                        <span key={index} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Slide Indicators */}
                <div className="flex flex-col space-y-2 ml-6">
                  {featuredMovies.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all hover:scale-125 ${
                        index === currentSlide ? 'bg-red-500 w-8 animate-glow' : 'bg-white/30 hover:bg-white/50'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 px-6 lg:px-12 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/4 right-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        
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

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Genre</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover movies across all your favorite genres with our extensive collection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {movieCategories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative z-10 text-center">
                  <category.icon className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold mb-1">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Movies</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the most popular movies loved by our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 md:gap-16 lg:gap-20 xl:gap-24">
            {moviesData.movies.slice(0, 10).map((movie, index) => (
              <div
                key={movie.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} size="default" showOverview={false} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Movies
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">MoBoe</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience the future of movie discovery with our cutting-edge features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
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
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
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

      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Movie Journey?
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join MoBoe today and discover your next favorite movie with our intelligent recommendation system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg animate-glow">
                <Play className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-black hover:bg-white/10 px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

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
