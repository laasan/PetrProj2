const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            gift = document.querySelector('.fixed-gift');

        const windows = document.querySelectorAll('[data-modal]');
        const scroll = calcScroll();



        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
    
                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = '';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                gift.style.marginRight = `${scroll}px`;
            });
        });
        
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = '';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            gift.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = '';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                gift.style.marginRight = `0px`;   
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            // if no modal displayed right now 
            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';

                // scroll from above not available here because of timer, so we create scroll right here
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;

                let gift = document.querySelector('.fixed-gift');
                gift.style.marginRight = `${scroll}px`;
            }
            
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            // for old brouser versions
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 5000);
};

export default modals;