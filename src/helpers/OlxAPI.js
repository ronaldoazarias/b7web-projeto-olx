// Já que estamos trabalhando com React, será criado hook para usar onde quiser
import Cookies from 'js-cookie';
import qs from 'qs'; // query string

const BASEAPI = 'http://localhost:3333';

const apiFetchFile = async (endpoint, body) => {
    
    //Recuperando o token caso não constar na mensagem
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        //Não tem header pq não vai como json
        body // Não usa JSON.stringify pq é fData
    });
    const json = await res.json();

    if(json.notallowed) {
        window.localStorage.href = '/sigin';
        return;
    }

    return json;

}

const apiFetchPost = async (endpoint, body) => {

    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.localStorage.href = '/sigin';
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint, body = []) => {

    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.localStorage.href = '/sigin';
        return;
    }

    return json;
}


const OlxAPI = {
    login:async (email, password) => {
        //Fazer consulta WS
        //return {error: 'Funcionalidade incompleta!'};
        console.log('Tentando fazer login!');
        const json = await apiFetchPost(
            '/user/signin', // endpoint
            {email, password}
        );

        /*const json = {
            token: '123456'
        }*/
        return json;
    }, 

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup', // endpoint
            {name, email, password, state: stateLoc}
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },    

    getAds: async (options) => {
        console.log('consultando ...');
        if(options.offset === 0) {
            return {ads: [
                        {id: 1, title:                    'Jaqueta Militar', price:     103, priceNegotiable: false, image: 'http://localhost:3333/assets/images/jaqueta_militar.jpg'}, 
                        {id: 2, title:                        'Suéter Slim', price:      72, priceNegotiable: true,  image: 'http://localhost:3333/assets/images/sueter.jpg'}
            ], total: 3}
        }
        else {
            return {ads: [
                {id: 3, title: 'Smartphone Xiaomi Redmi Note 8 Pro', price: 1499.99, priceNegotiable: false, image: 'http://localhost:3333/assets/images/redmi_note_9_pro.jpg'}
            ], total: 3}
        }
    },    

    getAd: async (id, otherAds = false) => {
        return {id: 1, title:                    'Jaqueta Militar', price:     103, priceNegotiable: false, image: 'http://localhost:3333/assets/images/jaqueta_militar.jpg', dateCreated: Date(), description: 'Jaqueta de ótima qualidade e grande estilo', views: 36, images: ['http://localhost/projeto-olx/images/jaqueta_militar.jpg', 'http://localhost/projeto-olx/images/jaqueta_militar_1.jpg', 'http://localhost/projeto-olx/images/jaqueta_militar_2.jpg'], userInfo: {name: 'Ronaldo', email: 'teste@teste.com'}, stateName: 'SP', category: {name: 'Moda masculina', slug: 'clothes'},
                others: [
                    {id: 1, title:                    'Jaqueta Militar', price:     103, priceNegotiable: false, image: 'http://localhost:3333/assets/images/jaqueta_militar.jpg'}, 
                    {id: 2, title:                        'Suéter Slim', price:      72, priceNegotiable: true,  image: 'http://localhost:3333/assets/images/sueter.jpg'},
                    {id: 3, title: 'Smartphone Xiaomi Redmi Note 8 Pro', price: 1499.99, priceNegotiable: false, image: 'http://localhost:3333/assets/images/redmi_note_9_pro.jpg'}
                ]    
        };
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    }
};

export default () => OlxAPI;