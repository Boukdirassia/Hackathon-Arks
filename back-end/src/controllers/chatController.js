/**
 * Chat Controller for MoBoe Movie App
 * Provides predefined responses about movie features without external API dependencies
 * Perfect for jury presentations - no API keys required!
 */

// Predefined responses about MoBoe movie features
const movieResponses = [
  "🎬 Welcome to MoBoe! I can help you discover amazing movies, manage your watchlist, and find your next favorite film. What would you like to explore?",
  "🍿 MoBoe offers advanced movie search and filtering! You can search by title, filter by genre, year, and rating. Try our random movie generator for surprises!",
  "⭐ Create your personal movie collections with MoBoe! Add movies to your watchlist, mark them as watched, rate them, and write reviews to remember your thoughts.",
  "🎭 Discover movies across all genres! From action-packed blockbusters to heartwarming dramas, sci-fi adventures to romantic comedies - MoBoe has it all.",
  "📊 Track your movie journey with MoBoe! See your watching statistics, favorite genres, and get personalized recommendations based on your preferences."
];

/**
 * Handle chat requests with predefined movie-related responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Input validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message must be a non-empty string',
        success: false 
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message cannot be empty or only whitespace',
        success: false 
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({ 
        error: 'Message length cannot exceed 1000 characters',
        success: false 
      });
    }

    // Log the incoming message for debugging
    console.log('📨 Chat message received:', message.substring(0, 100) + (message.length > 100 ? '...' : ''));

    // Select a random response from our predefined responses
    const randomIndex = Math.floor(Math.random() * movieResponses.length);
    const selectedResponse = movieResponses[randomIndex];

    // Simulate a small delay to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Return the response
    res.json({ 
      response: selectedResponse,
      success: true,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Chat response sent successfully');

  } catch (error) {
    console.error('❌ Chat error:', error);
    
    res.status(500).json({ 
      error: 'Failed to process chat request',
      success: false,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};