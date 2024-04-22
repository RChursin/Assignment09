/** This module is responsible for loading the employee data from the JSON file. */

async function loadEmployees() {
    try {
        // Fetch the employee data from the JSON file
        const response = await fetch('../../data/employees.json');
        const employees = await response.json();
        return employees;
        // Return the employee data as an array
    } catch (error) {
        // If an error occurs, log it to the console and return an empty array
        console.error('Error loading employee data:', error);
        return [];
    }
 }
 
 export { loadEmployees };