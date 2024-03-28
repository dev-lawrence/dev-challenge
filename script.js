const form = document.querySelector('form');
const selectActivity = document.querySelector('#activity-select');
const foodAllergies = document.querySelector('#food-allergies');
const additionalInfo = document.querySelector('#additional-info');
const container = document.querySelector('#camp-activities-inquiry');
const body = document.querySelector('body');

foodAllergies.placeholder = 'Please list any food allergies';
additionalInfo.placeholder = 'Enter additional information';

const errorMessage = document.createElement('p');
errorMessage.textContent = 'Please select an activity';
errorMessage.classList.add('error-message');
errorMessage.className = 'error-message';

selectActivity.addEventListener('change', () => {
  if (errorMessage) {
    errorMessage.remove();
  }
});

// form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const successMessage = document.createElement('p');
  successMessage.textContent = `Thank you for your submission! Your inquiry has been successfully received.`;
  successMessage.classList.add('success-message');
  successMessage.id = 'success-message';

  const formData = new FormData(form);

  // Convert formData to a plain object
  const data = Object.fromEntries(formData);

  if (!data.activity) {
    // Remove existing alert errors before inserting a new one
    const existingAlertError = document.querySelector('.error-message');
    if (existingAlertError) {
      existingAlertError.remove();
    }
    selectActivity.insertAdjacentElement('beforebegin', errorMessage);
  } else if (!data.food_allergies) {
    errorMessage.textContent = 'List any food allergies';
    foodAllergies.insertAdjacentElement('beforebegin', errorMessage);
  } else if (!data.additional_info) {
    errorMessage.textContent = 'Enter additional information';
    additionalInfo.insertAdjacentElement('beforebegin', errorMessage);
  } else {
    // Remove existing alert success before inserting a new one
    const existingAlertSuccess = document.querySelector('.success-message');
    if (existingAlertSuccess) {
      existingAlertSuccess.remove();
    }

    container.insertAdjacentElement('afterend', successMessage);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    // Clear form fields
    form.reset();

    // Remove alert success after 5 seconds
    setTimeout(() => {
      successMessage.remove();
      overlay.remove();
    }, 2000);
  }
});
