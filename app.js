/**
 * @method setCookie sets up cookie on browser
 * @param {String} name 
 * @param {Mixed} value 
 * @param {Int} days 
 * 
*/

const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


/**
 * 
 * @method getFormData
 * @param {String} formElem | Form Element to get data
 * @returns {Obj} | Form data Object
*/

const getFormData = (formElem) => {

    var form;

    if ( typeof formElem === 'string' ) {
        form = document.querySelector(formElem);
    } else {
        form = formElem;
    }

    let formdata = new FormData(form);
    let data = {};

    for (var pair of formdata.entries()) {
        data[pair[0]] = pair[1];
    }

    return data;
}


const handleUserName = e => {
    e.preventDefault();

    let formData = getFormData(e.target); 


    if ( !getCookie('nomeDoJogador') ) {   
        setCookie('nomeDoJogador', formData.nome, 999)   
    }

    console.log(getCookie('nomeDoJogador'));
}


const init = () => {
    let nameForm = document.querySelector('.name-form'); 
    
    if ( nameForm ) {
        nameForm.addEventListener('submit', handleUserName);
    }
}

window.addEventListener('load', init);


