import { loadEmployees } from './modules/init.js';

// GET DOM ELEMENTS
const form = document.getElementById('empForm');
const empTable = document.getElementById('employees');
const empCount = document.getElementById('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
  // PREVENT FORM SUBMISSION
  e.preventDefault();
  // GET THE VALUES FROM THE TEXT BOXES
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const ext = document.getElementById('ext').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
  const newEmployee = { id, name, ext, email, department };
  // TODO: Send a request to the server to add the new employee
  // For now, just rebuild the grid with the existing employees
  buildGrid();
  // RESET THE FORM
  form.reset();
  // SET FOCUS BACK TO THE ID TEXT BOX
  document.getElementById('id').focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete')) {
      // CONFIRM THE DELETE
      if (confirm('Are you sure you want to delete this employee?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        const rowIndex = e.target.parentNode.parentNode.rowIndex;
        
        try {
          // REMOVE EMPLOYEE ROW FROM TABLE
          empTable.deleteRow(rowIndex);
          // UPDATE EMPLOYEE COUNT
          empCount.textContent = empTable.rows.length - 1;
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }
    }
  });

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
  try {
    const employees = await loadEmployees();
    // Remove the existing set of rows by removing the entire tbody section
    empTable.querySelector('tbody').remove();
    // Rebuild the tbody from scratch
    const tbody = document.createElement('tbody');
    // Loop through the array of employees
    for (let employee of employees) {
      // Rebuilding the row structure
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.ext}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
      `;
      tbody.appendChild(row);
    }
    // Bind the tbody to the employee table
    empTable.appendChild(tbody);
    // Update employee count
    empCount.textContent = employees.length;
  } catch (error) {
    console.error('Error building grid:', error);
  }
}