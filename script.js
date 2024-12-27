// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation
document.querySelector('form').addEventListener('submit', function(e) {
    const email = document.querySelector('#email').value;
    if (!email.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email.');
    }
});