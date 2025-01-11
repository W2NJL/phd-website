const blogContainer = document.getElementById('blog-posts');
const repoURL = 'https://api.github.com/repos/W2NJL/phd-website/contents/blog';

function fetchBlogPosts() {
    fetch(repoURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                if (file.name.endsWith('.md')) {
                    fetch(file.download_url)
                        .then(response => response.text())
                        .then(markdown => {
                            const postHTML = convertMarkdownToHTML(markdown);
                            blogContainer.innerHTML += postHTML;
                        });
                }
            });
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function convertMarkdownToHTML(markdown) {
    // Basic Markdown to HTML conversion (you can use a library like marked.js for more advanced parsing)
    const titleMatch = markdown.match(/title: "(.*)"/);
    const dateMatch = markdown.match(/date: "(.*)"/);
    const content = markdown.split('---')[2];

    return `
        <div class="blog-posts">
            <h3>${titleMatch ? titleMatch[1] : 'Untitled'}</h3>
            <p class="blog-date">${dateMatch ? dateMatch[1] : ''}</p>
            <p>${content}</p>
        </div>
    `;
}

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', fetchBlogPosts);
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

