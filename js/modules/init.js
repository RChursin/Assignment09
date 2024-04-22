async function loadEmployees() {
    try {
        const response = await fetch('../../data/employees.json');
        const employees = await response.json();
        return employees;
    } catch (error) {
        console.error('Error loading employee data:', error);
        return [];
    }
 }
 
 export { loadEmployees };