
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const quizForm = document.getElementById('quizForm');
    const scoreLabel = document.getElementById('score');
    const msgLabel = document.getElementById('msg1');
    const signinForm = document.getElementById('signinForm');
    const signinDiv = document.querySelector('.signin');
    const quizDiv = document.querySelector('.quiz');
    
    let currentPage = 0;
    let userName = '';
    
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userName = document.getElementById('fullName').value;
        signinDiv.style.display = 'none';
        quizDiv.style.display = 'block';
        showPage(currentPage);
    });

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === pageIndex);
        });

        prevBtn.style.display = pageIndex === 0 ? 'none' : 'inline';
        nextBtn.style.display = pageIndex === pages.length - 1 ? 'none' : 'inline';
        submitBtn.style.display = pageIndex === pages.length - 1 ? 'inline' : 'none';
    }

    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    submitBtn.addEventListener('click', () => {
        let score = 0;
        const totalQuestions = quizForm.querySelectorAll('.question').length;

        // Check each question's answer
        pages.forEach(page => {
            const questions = page.querySelectorAll('.question');
            questions.forEach(question => {
                const inputs = question.querySelectorAll('input[type="radio"]');
                let selectedAnswer = null;
                inputs.forEach(input => {
                    if (input.checked) {
                        selectedAnswer = input;
                    }
                });

                if (selectedAnswer) {
                    if (selectedAnswer.value === 't') {
                        score++;
                        selectedAnswer.nextElementSibling.style.color = 'green';
                    } else {
                        selectedAnswer.nextElementSibling.style.color = 'red';
                    }
                }

                // Highlight correct answer
                inputs.forEach(input => {
                    if (input.value === 't') {
                        input.nextElementSibling.style.color = 'green';
                    }
                });
            });
        });
        scoreLabel.textContent = `${userName}, you scored ${score} / ${totalQuestions}`;
    });
});
