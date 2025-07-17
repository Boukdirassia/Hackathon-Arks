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



  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-800 animate-pulse"></div>
          
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
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-red-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-red-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-red-800/30"></div>
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
                  className="border-white/30 text-black hover:bg-black/10 px-8 py-4 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Movies
                </Button>
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

      <section className="py-20 bg-gradient-to-b from-black to-red-950">
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

      <section className="py-20 bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.08),transparent_50%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold tracking-wide uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Why <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-400 animate-pulse">
                MoBoe Stands Out
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of movie discovery with our revolutionary features designed for true cinema enthusiasts
            </p>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-red-500/5 backdrop-blur-xl border border-white/10 hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] animate-slide-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start space-x-6">
                    {/* Enhanced Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-500/20">
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/80 transition-colors">
                        {feature.description}
                      </p>
                      
                      {/* Animated Arrow */}
                      <div className="mt-6 flex items-center text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                        <span className="text-sm font-semibold mr-2">Learn More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>

        </div>
      </section>

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

      {/* Pricing Section */}
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
