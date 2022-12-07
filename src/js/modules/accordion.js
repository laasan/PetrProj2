const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
        
    const closeButtons = () => {
        btns.forEach(btn => {
            btn.classList.remove('active-style');
            btn.nextElementSibling.classList.remove('active-content');
            btn.nextElementSibling.style.maxHeight = '0px';
        });
    };

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeButtons();
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordion;