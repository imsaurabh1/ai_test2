import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing
import Sidebar from '../components/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {

  const mockSetSelectedLanguages = jest.fn();
  const mockSetSelectedExcellenceScore = jest.fn();
  const mockSetSelectedContributors = jest.fn();
  const mockSetSelectedOperatingSystems = jest.fn();
  const mockSetSelectedPlanningClasses = jest.fn();
  const mockSetSelectedPlanningTypes = jest.fn();
  const mockSetSelectedDocumentation = jest.fn();
  const mockSetSelectedExplanationAbstract = jest.fn();
  const mockSetSelectedPlannerReferences = jest.fn();
  const mockSetSelectedExecutable = jest.fn();
  const mockSetSelectedSourceCode = jest.fn();
  const mockSetSelectedEnvironmentNotes = jest.fn();
  const mockSetSelectedImplementationLanguage = jest.fn();

  const defaultProps = {
    selectedLanguages: [], // Ensure it's an array
    setSelectedLanguages: mockSetSelectedLanguages,
    selectedExcellenceScore: [], // Ensure it's an array
    setSelectedExcellenceScore: mockSetSelectedExcellenceScore,
    selectedContributors: false, // Ensure it's a boolean
    setSelectedContributors: mockSetSelectedContributors,
    selectedOperatingSystems: [], // Ensure it's an array
    setSelectedOperatingSystems: mockSetSelectedOperatingSystems,
    selectedPlanningClasses: [], // Ensure it's an array
    setSelectedPlanningClasses: mockSetSelectedPlanningClasses,
    selectedPlanningTypes: [], // Ensure it's an array
    setSelectedPlanningTypes: mockSetSelectedPlanningTypes,
    availablePlanningTypes: [], // Ensure it's an array
    selectedDocumentation: false, // Ensure it's a boolean
    setSelectedDocumentation: mockSetSelectedDocumentation,
    selectedExplanationAbstract: false, // Ensure it's a boolean
    setSelectedExplanationAbstract: mockSetSelectedExplanationAbstract,
    selectedPlannerReferences: false, // Ensure it's a boolean
    setSelectedPlannerReferences: mockSetSelectedPlannerReferences,
    selectedExecutable: false, // Ensure it's a boolean
    setSelectedExecutable: mockSetSelectedExecutable,
    selectedSourceCode: false, // Ensure it's a boolean
    setSelectedSourceCode: mockSetSelectedSourceCode,
    selectedEnvironmentNotes: false, // Ensure it's a boolean
    setSelectedEnvironmentNotes: mockSetSelectedEnvironmentNotes,
    selectedImplementationLanguage: false, // Ensure it's a boolean
    setSelectedImplementationLanguage: mockSetSelectedImplementationLanguage,
  };
  

  test('opens multiple drawers simultaneously', () => {
    render(
      <MemoryRouter> {/* Wrap the component inside MemoryRouter */}
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
  
    // Open "Planning Languages" drawer
    fireEvent.click(screen.getByText(/Planning Languages/i));
    expect(screen.getByLabelText('HDDL')).toBeVisible();
  
    // Open "Excellence Score" drawer
    fireEvent.click(screen.getByText(/Excellence Score/i));
    expect(screen.getByLabelText('Excellent')).toBeVisible();
  
    // Both drawers should remain open
    expect(screen.getByLabelText('HDDL')).toBeVisible();
    expect(screen.getByLabelText('Excellent')).toBeVisible();
  });
  
  
  
  test('renders Sidebar with "Planning Languages" section', () => {
    render(
      <MemoryRouter> {/* Wrap the component inside MemoryRouter */}
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );

    // Check if the Planning Languages filter is rendered
    expect(screen.getByText(/Planning Languages/i)).toBeInTheDocument();
  });

  test('opens and closes "Planning Languages" drawer on click', () => {
    render(
      <MemoryRouter> {/* Wrap the component inside MemoryRouter */}
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
  
    const planningLanguagesHeader = screen.getByText(/Planning Languages/i);
    
    // Click to open the drawer
    fireEvent.click(planningLanguagesHeader);
    expect(screen.getByText('HDDL')).toBeVisible();
  
    // Click to close the drawer
    fireEvent.click(planningLanguagesHeader);
    
    // Check that the drawer is closed by checking the drawer class
    const drawer = screen.getByText('HDDL').closest('.filter-drawer');
    expect(drawer).not.toHaveClass('open');
  });
  


  test('toggles "Contributors Listed" checkbox', () => {
    render(
      <MemoryRouter> {/* Wrap the component inside MemoryRouter */}
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
  
    // Open the "Contributors Listed" drawer
    fireEvent.click(screen.getByText(/Contributors Listed/i));
  
    // Get all checkboxes with the role "checkbox" and select the first one
    const checkboxes = screen.getAllByRole('checkbox', { name: /Yes/i });
    
    // Assuming the first one is the checkbox for "Contributors Listed"
    fireEvent.click(checkboxes[0]);
  
    // Ensure the checkbox toggle function was called
    expect(mockSetSelectedContributors).toHaveBeenCalledWith(true);
  });
  
});
