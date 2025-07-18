import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/ui/button"
import {
  Film,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react"

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    try {
      await register(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Animation variants - Style simplifié cohérent avec la landing page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-600/10 via-indigo-600/10 to-purple-600/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Dynamic light rays */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-radial from-red-500/20 via-red-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-pink-500/10 via-red-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-red-500/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-purple-500/30 rotate-12 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 border border-pink-500/30 rotate-45 animate-pulse"></div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, ${['#ef4444', '#8b5cf6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)]}/60, transparent)`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md w-full">
          {/* Enhanced Logo Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div 
              className="flex justify-center mb-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
                {/* Inner glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-50 group-hover:opacity-75"></div>
                {/* Main logo container */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-red-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <Film className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
                {/* Floating accent dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent drop-shadow-2xl"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                Join <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">MoBoe</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 font-medium tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Begin your <span className="text-red-400 font-semibold">ultimate</span> movie experience
              </motion.p>
              <motion.div
                className="mt-4 w-24 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Form Container */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75"></div>
            
            <div className="relative">
              {/* Glassmorphism container */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-red-500/30 via-purple-500/30 to-pink-500/30">
                  <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-3xl"></div>
                </div>
                
                {/* Inner content */}
                <div className="relative z-10">
                  <motion.form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <motion.div variants={itemVariants}>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="Choose your username"
                        />
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants}>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          className="w-full pl-10 pr-12 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-500/15 border border-red-500/40 rounded-xl p-4 text-red-300 text-sm text-center"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <span>Create Account</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>

                  {/* Login Link */}
                  <motion.div className="text-center mt-8" variants={itemVariants}>
                    <p className="text-gray-400">
                      Already have an account?{" "}
                      <Link to="/auth/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                        Sign in
                      </Link>
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
