window.addEventListener('DOMContentLoaded', function() {
    //Tabs
    let   tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items'); //for dinamic adding

    function hideTabContent(){
        // Hide content
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // hide active
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e)=>{
        const target = e.target;

        if( target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target==item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //Timer

    const deadLine = '2021-02-25';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), //date that we need
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24 )),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num){
        if (num>=0 && num<10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); //our function run per second

        updateClock(); //template bug fixed


        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // Modal

    const modalTrigger = document.querySelector('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modelTimerId);
    }


    modalTrigger.forEach(btn=>{
        btn.addEventListener('click', openModal);
    });



    function closeModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = '';
    }


    modalCloseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e)=>{
        if(e.target === modal){
           closeModal();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modelTimerId = setTimeout(openModal, 3000);


    function showModalBySCroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalBySCroll);
        }
    }

    // if user scroll to the end show modal
    window.addEventListener('scroll', showModalBySCroll);
});





