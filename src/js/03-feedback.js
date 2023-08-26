const _ = require('lodash');

const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const form = document.querySelector('.feedback-form');

let feedbackFromState = {
    email: '',
    message: ''
};
const saveСurrentValue = _.throttle(() => {
    feedbackFromState.email = emailInput.value;
    feedbackFromState.message = messageInput.value;

    localStorage.setItem(
        'feedback-form-state',
        JSON.stringify(feedbackFromState)
    );
}, 500);
// Під час завантаження сторінки перевіряй стан сховища,
//  і якщо там є збережені дані, заповнюй ними поля форми.
//  В іншому випадку поля повинні бути порожніми.

document.querySelector('DOMContentLoaded', function () {
    const storageStatus = localStorage.getItem('feedback-form-state');
    if (storageStatus) {
        feedbackFromState = JSON.parse(storageStatus);
        emailInput.value = feedbackFromState.email;
        messageInput.value = feedbackFromState.message;

    }
});

emailInput.addEventListener('input', saveСurrentValue);
messageInput.addEventListener('input', saveСurrentValue);



form.addEventListener('submit', function (event) {
    event.preventDefault()
    
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
     
    console.log({
    email: feedbackFromState.email,
    message: feedbackFromState.message
  });
    
});
