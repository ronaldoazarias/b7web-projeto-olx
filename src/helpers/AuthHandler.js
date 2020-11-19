import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    console.log('logged: '+token);
    return (token) ? true : false;    
}

export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('token', token, { expires: 999});
    }
    else { // Somente enquanto navegador estiver aberto
        Cookies.set('token', token);
    }
}

export const doLogout = () => {
    Cookies.remove('token');
}