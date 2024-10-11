// App.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AppWithRouter from '../App';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mocking axios to avoid actual network requests
jest.mock('axios');

describe('App component', () => {
  
  beforeEach(() => {
    // Mock the axios responses for both tools and planning types
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:5000/tools/query') {
        // Return a mock response for the tools query
        return Promise.resolve({ data: [] }); // You can add some mock data here if needed
      } else if (url === 'http://localhost:5000/tools/planning-types') {
        // Return a mock response for planning types
        return Promise.resolve({ data: [] }); // You can adjust the mock data based on your needs
      }
      return Promise.reject(new Error('not found'));
    });
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  // Test Case 1 to render header and footer correctly without fetching actual planning types
  test('renders header and footer correctly without fetching planning types', async () => {
    
    await act(async () => {
      render(<AppWithRouter />);
    });

    // Check that the header is rendered
    expect(screen.getByText(/Add AI Planning Software/i)).toBeInTheDocument();

    // Check that the footer is rendered
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  // Test Case 2 to render the search input on the homepage
  test('renders the search input on the homepage without fetching planning types', async () => {
    
    await act(async () => {
      render(<AppWithRouter />);
    });

    // Check that the search input is rendered
    const searchInput = screen.getByPlaceholderText(/Search AI Planners/i);
    expect(searchInput).toBeInTheDocument();
  });
});
