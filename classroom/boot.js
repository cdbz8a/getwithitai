// Reads the classroom settings PHP put in the page (kept out of inline script for the CSP).
window.CLASSROOM = JSON.parse(document.getElementById("cls").textContent);
