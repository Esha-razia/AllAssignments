// Accordion behavior for CV sections
const headings = document.querySelectorAll('.section h2');

headings.forEach(heading => {
  heading.addEventListener('click', () => {
    const content = heading.nextElementSibling;

    // Close other open sections
    document.querySelectorAll('.content').forEach(c => {
      if (c !== content) c.style.display = 'none';
    });

    // Toggle current one
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  });
});
