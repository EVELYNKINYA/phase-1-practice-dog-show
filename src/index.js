
const fetchDogs = async () => {
    const response = await fetch('http://localhost:3000/dogs');
    const data = await response.json();
    return data;
  };

  const renderDogsTable = (dogs) => {
    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';
    dogs.forEach((dog) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button class="edit-btn" data-id="${dog.id}">Edit</button></td>`;
      tableBody.appendChild(row);
    });
  };

  const populateForm = (dog) => {
    const form = document.getElementById('dogForm');
    form.elements.name.value = dog.name;
    form.elements.breed.value = dog.breed;
    form.elements.sex.value = dog.sex;
    form.setAttribute('data-id', dog.id);
  };

  const updateDog = async (id, updatedDog) => {
    await fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    });
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const dogs = await fetchDogs();
    renderDogsTable(dogs);

    const tableBody = document.getElementById('tableBody');
    const form = document.getElementById('dogForm');

    tableBody.addEventListener('click', async (event) => {
      if (event.target.classList.contains('edit-btn')) {
        const dogId = event.target.getAttribute('data-id');
        const selectedDog = dogs.find((dog) => dog.id === parseInt(dogId));
        populateForm(selectedDog);
        //delete the dog here
        
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const dogId = form.getAttribute('data-id');
      const updatedDog = {
        name: form.elements.name.value,
        breed: form.elements.breed.value,
        sex: form.elements.sex.value,
      };

      await updateDog(dogId, updatedDog);

      // Optionally, you can re-fetch the dogs or use optimistic rendering
      const updatedDogs = await fetchDogs();
      renderDogsTable(updatedDogs);

      // Clear the form
      form.reset();
      form.removeAttribute('data-id');
    });
  });