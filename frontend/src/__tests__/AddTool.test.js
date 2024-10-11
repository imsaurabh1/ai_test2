import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import AddTool from '../components/AddTool';
import '@testing-library/jest-dom';

jest.mock('axios');

beforeAll(() => {
  window.scrollTo = jest.fn();
});

// Mock the useNavigate hook to test form submission navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddTool Component', () => {

  // Test Case 1 to render all form fields
  test('renders all form fields', async () => {
    render(
      <MemoryRouter>
        <AddTool />
      </MemoryRouter>
    );

    // Check if the main form fields are rendered
    expect(screen.getByLabelText(/Short Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Long Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contributors/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Implementation Languages/i)).toBeInTheDocument();
    
    // Ensure that any asynchronous content has been loaded (if applicable)
    await waitFor(() => expect(screen.getByLabelText(/Short Name/i)).toBeInTheDocument());
  });

  // Test Case 2 - Validation for either short name or long name field
  test('validates that either short name or long name is required on submit', async () => {
    render(
      <MemoryRouter>
        <AddTool />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/Next/i);
    fireEvent.click(submitButton);

    // Wait for error message to appear (as validation might be async)
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Either Long name or Short name is required/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  // Test Case 3 - Submit form with valid values for short name and long name
  test('submits form with empty and null values correctly', async () => {
    render(
      <MemoryRouter>
        <AddTool />
      </MemoryRouter>
    );

    // Fill in the required fields
    const longNameInput = screen.getByLabelText(/Long Name/i);
    fireEvent.change(longNameInput, { target: { value: 'Test Long Name' } });

    const shortNameInput = screen.getByLabelText(/Short Name/i);
    fireEvent.change(shortNameInput, { target: { value: 'Test Short Name' } });

    const yearInput = screen.getByLabelText(/Year/i);
    fireEvent.change(yearInput, { target: { value: '2022' } });

    // Submit the form
    const submitButton = screen.getByText(/Next/i);
    fireEvent.click(submitButton);

    // Wait for the form submission to trigger navigation
    await waitFor(() => {
      // Check that navigate was called with the correctly formatted formData
      expect(mockNavigate).toHaveBeenCalledWith('/confirm-tool', {
        state: {
          formData: expect.objectContaining({
            shortName: 'Test Short Name',
            longName: 'Test Long Name',
            year: '2022',
            contributors: null,  // Assuming no contributors were entered
            implementationLanguages: null,  // Assuming no implementation languages were entered
          }),
        },
      });
    });
  });
});
