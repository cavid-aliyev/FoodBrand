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

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearInterval(modelTimerId);
    }


    modalTrigger.forEach(btn=>{
        btn.addEventListener('click', openModal);
    });



    function closeModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = '';
    }


    // modaldan bawqa neye bassam close olacaq
    modal.addEventListener('click', (e)=>{
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
           closeModal();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    // const modelTimerId = setTimeout(openModal, 3000);


    // function showModalBySCroll(){
    //     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    //         openModal();
    //         window.removeEventListener('scroll', showModalBySCroll);
    //     }
    // }

    // if user scroll to the end show modal
    // window.addEventListener('scroll', showModalBySCroll);


    //Using classes for cards
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 1.7;
            this.changeToAZN(); 
        }

        changeToAZN() {
            this.price = Math.round(this.price * this.transfer); 
        }

        render() {
            const element = document.createElement('div');

            // If we dont put any classes please put default class
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> azn/gün</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        '"Fitness" menyusu',
        '"Fitness" menyusu - yemək bişirməyə yeni bir yanaşmadır: daha çox təzə tərəvəz və meyvələr. Aktiv və sağlam insanların məhsulu. Bu, optimal qiymətə və yüksək keyfiyyətə malik tamamilə yeni bir məhsuldur!',
        12,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        '"Arıq" menyu',
        '"Arıq" menyu - maddələrin diqqətlə seçilməsidir: heyvan məhsullarının, badem, yulaf, hindistan cevizi və ya qarabaşaq yarması olan südün, tofu və idxal olunan vegetarian bifteklərinə görə lazımlı miqdarda zülal.',
        20,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        '"Premium" menyu',
        '"Premium" menyuda - yalnız gözəl qablaşdırma dizaynından deyil, həm də qabların yüksək keyfiyyətli icrasından istifadə edirik. Qırmızı balıq, dəniz məhsulları, meyvələr - restorana getmədən restoran menyusu!',
        28,
        ".menu .container"
    ).render();

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you! We will call you soon',
        failure: 'Something went wrong(',
    };

    forms.forEach(item =>{
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            //Put message
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object ={};
            formData.forEach((value, key) =>{
                object[key] = value;
            });

            // Sending datas 
            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object) 

            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(data =>{
                showThanksModal(message.failure);
            })
            .finally(data => {
                form.reset();
            });
        });
    }


    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu  ')
         .then(data => data.json())
         .then(res => console.log(res));
});



