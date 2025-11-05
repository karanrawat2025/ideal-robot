// Handle feedback form submission
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    document.getElementById("response").innerText = data.message;
    feedbackForm.reset();
  });
}

// Load feedbacks for admin
const feedbackTable = document.getElementById("feedbackTable");
if (feedbackTable) {
  fetch("http://localhost:5000/api/feedback")
    .then(res => res.json())
    .then(data => {
      const tbody = feedbackTable.querySelector("tbody");
      data.forEach(fb => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${fb.name}</td>
          <td>${fb.email}</td>
          <td>${fb.message}</td>
          <td>${new Date(fb.date).toLocaleString()}</td>
        `;
        tbody.appendChild(row);
      });
    });
}
