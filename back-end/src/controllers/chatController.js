import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message must be a non-empty string' });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty or only whitespace' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message length cannot exceed 1000 characters' });
    }

    // Initialize the model with timeout
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    });

    // Set timeout for the API request
    const timeoutMs = 30000; // 30 seconds timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    );

    // Generate content with timeout and configuration
    const result = await Promise.race([
      model.generateContent({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
      timeoutPromise
    ]);

    const response = await result.response;
    const text = await response.text();

    // Basic response validation
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid response from AI model');
    }

    res.json({ response: text });
  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = error.message || 'Failed to process chat request';
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};