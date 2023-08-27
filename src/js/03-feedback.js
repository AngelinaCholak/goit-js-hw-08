const _ = require('lodash');


const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const form = document.querySelector('.feedback-form');

let feedbackFormState = {
    email: '',
    message: ''
};


const updateForm = _.throttle(() => {
    feedbackFormState.email = emailInput.value;
    feedbackFormState.message = messageInput.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormState));
}, 500); 

emailInput.addEventListener('input', updateForm);
messageInput.addEventListener('input', updateForm);


document.addEventListener('DOMContentLoaded', function () {
    const savedState = localStorage.getItem('feedback-form-state');
    if (savedState) {
        feedbackFormState = JSON.parse(savedState);
        emailInput.value = feedbackFormState.email;
        messageInput.value = feedbackFormState.message;
    }
});


form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (feedbackFormState.email && feedbackFormState.message) {
        console.log({
            email: feedbackFormState.email,
            message: feedbackFormState.message
        });

        localStorage.removeItem('feedback-form-state');
        emailInput.value = '';
        messageInput.value = '';
    } else {
        console.log("Both fields must be filled out before submitting.");
    }
});


window.addEventListener('beforeunload', function () {
    updateForm.cancel(); 
    updateForm(); 
});