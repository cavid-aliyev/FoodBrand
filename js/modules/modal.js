function closeModal(modalelector) {
    const modal = document.querySelector(modalelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalelector, modalTimerId) {
    const modal = document.querySelector(modalelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId) {
      clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalelector, modalTimerId){
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalelector, modalTimerId));
    });



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalelector);
        }
    });



    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal(modalSelector, modalTimerId);
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // }
    // window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};