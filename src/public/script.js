function deleteEntry(id) {
  console.log("hello")
  if (confirm("Do you really want to delete this row?")) {
    fetch(`api/dishes/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed")
        window.location.reload();
        return res.json()
      })
  }
}

function updateEntry(id) {
  const row = document.getElementById(`row-${id}`);
  const cells = row.querySelectorAll("td");

  // Replace text with input fields
  const fields = ["name", "ingredients", "preparationSteps", "cookingTime", "origin", "spice"];
  fields.forEach((field, i) => {
    const value = cells[i].innerText;
    cells[i].innerHTML = `<input value="${value}" id="${field}-${id}" />`;
  });

  cells[6].innerHTML = `<button onclick="submitUpdate('${id}')">Save</button>`;
}

function submitUpdate(id) {
  const updatedRecipe = {
    name: document.getElementById(`name-${id}`).value,
    ingredients: document.getElementById(`ingredients-${id}`).value,
    preparationSteps: document.getElementById(`preparationSteps-${id}`).value,
    cookingTime: document.getElementById(`cookingTime-${id}`).value,
    origin: document.getElementById(`origin-${id}`).value,
    spice: document.getElementById(`spice-${id}`).value
  };

  fetch(`/api/dishes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRecipe)
  })
    .then(res => res.json())
    .then(() => {
      alert("Recipe updated!");
      window.location.reload();
    })
    .catch(err => console.error(err));
}

fetch('/api/dishes')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('dishes-table');
    data.forEach(dish => {
      const row = table.insertRow();
      row.id = `row-${dish._id}`
      row.innerHTML = `<td>${dish.name}</td><td>${dish.ingredients}</td><td>${dish.preparationSteps}</td><td>${dish.cookingTime}</td><td>${dish.origin}</td><td>${dish.spice}</td><td><button onclick="deleteEntry('${dish._id}')">Delete</button><button onclick="updateEntry('${dish._id}')">Update</button></td>`;
    });
  });
