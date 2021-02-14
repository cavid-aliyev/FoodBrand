function forms(){
      // Forms
      const forms = document.querySelectorAll('form');

      const message = {
          loading: 'img/form/spinner.svg',
          success: 'Thank you! We will call you soon',
          failure: 'Something went wrong(',
      };
  
  
      //Function for posting datas
      const postData = async (url, data) => {
          const res = await fetch(url, {
              method: "POST",
              headers: {
                  'Content-type': 'application/json'
              },
              body: data
          });
  
          return await res.json();
      };
  
      forms.forEach(item => {
          bindPostData(item);
      });
  
      function bindPostData(form) {
          form.addEventListener('submit', (e) => {
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
  
              //Convert Formdata to json
              //1) we convert data to massive(entries)
              //2)we convert massive to obj(ftomEntries)
              //3)We convert all to json(stringify)
              const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
  
              // Sending datas 
              postData('http://localhost:3000/requests', json)
                  .then(data => {
                      console.log(data);
                      showThanksModal(message.success);
                      statusMessage.remove();
                  })
                  .catch(data => {
                      showThanksModal(message.failure);
                  })
                  .finally(data => {
                      form.reset();
                  });
          });
      }
  
  
      function showThanksModal(message) {
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
  
}

module.exports = forms;