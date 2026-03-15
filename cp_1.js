document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');          
  const feedbackList = document.getElementById('feedback-list');   
  const confirmation = document.getElementById('confirmation');
  const charCount = document.querySelector('.char-count');

  // Character counter (already working – keep it)
  const textarea = document.getElementById('feedback');
  if (textarea) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      if (charCount) charCount.textContent = `${len} / 500`;
    });
  }

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();   

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const nameVal     = document.getElementById('name')?.value.trim()     || '';
    const emailVal    = document.getElementById('email')?.value.trim()    || '';
    const feedbackVal = document.getElementById('feedback')?.value.trim() || '';

    let isValid = true;

    if (!nameVal) {
      document.querySelector('#name ~ .error')?.append('Name is required');
      isValid = false;
    }
    if (!emailVal) {
      document.querySelector('#email ~ .error')?.append('Email is required');
      isValid = false;
    }
    if (!feedbackVal) {
      document.querySelector('#feedback ~ .error')?.append('Feedback is required');
      isValid = false;
    }

    if (isValid) {
      // Feedback Entry
      const entry = document.createElement('div');
      entry.className = 'feedback-item';
      entry.innerHTML = `
        <strong>${nameVal}</strong> (${emailVal})<br>
        ${feedbackVal.replace(/\n/g, '<br>')}
        <small style="display:block; margin-top:8px; color:#777;">
          ${new Date().toLocaleString()}
        </small>
      `;

      if (feedbackList) {
        feedbackList.appendChild(entry);
      }

      // Reset form
      form.reset();

      // Update char count
      if (charCount) charCount.textContent = '0 / 500';

      // Show thank you message
      if (confirmation) {
        confirmation.style.display = 'block';
        confirmation.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});