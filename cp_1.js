document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const comments = document.getElementById('comments');
  const charCount = document.querySelector('.char-count');
  const feedbackList = document.getElementById('feedback-list');

  // Character counter
  comments.addEventListener('input', () => {
    const len = comments.value.length;
    charCount.textContent = `${len} / 500`;
  });

  // Event delegation
  form.addEventListener('mouseover', (e) => {
    if (e.target.closest('.form-group')) {
      e.target.closest('.form-group').querySelector('.tooltip').style.opacity = '1';
    }
  });

  form.addEventListener('mouseout', (e) => {
    if (e.target.closest('.form-group')) {
      e.target.closest('.form-group').querySelector('.tooltip').style.opacity = '0';
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear old errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = comments.value.trim();

    let isValid = true;

    if (!name) {
      document.querySelector('#name ~ .error').textContent = 'Required';
      isValid = false;
    }
    if (!email) {
      document.querySelector('#email ~ .error').textContent = 'Required';
      isValid = false;
    }
    if (!comment) {
      document.querySelector('#comments ~ .error').textContent = 'Required';
      isValid = false;
    }

    if (isValid) {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<strong>${name}</strong> (${email})<br>${comment.replace(/\n/g, '<br>')}`;
      feedbackList.appendChild(div);

      form.reset();
      charCount.textContent = '0 / 500';
    }
  });

  // Show that clicks outside the form do not trigger any propagation issues
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.container') === null) {
      // console.log('click outside form - no propagation issue');
    }
  });
});