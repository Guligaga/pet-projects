function Ajax(baseURL = 'https://api.net') {
    this.get = function(...args) {
        if(typeof args[args.length - 1] !== 'function') {
            args.push(() => {});
        }
        const onloadHandler = args.pop();
        const url = (baseURL + '/' + args.join('/')).replace('/?', '?');
        this.xhr('get', url, onloadHandler);
    }

    this.post = function(...args) {
        if(typeof args[args.length - 1] !== 'function') {
            args.push(() => {});
        }
        const onloadHandler = args.pop();
        const body = JSON.stringify(args.pop());
        const headers = args.pop();
        const url = (baseURL + '/' + args.join('/')).replace('/?', '?');
        this.xhr('post', url, onloadHandler, body), headers;
    }

    this.xhr = function(type = 'GET', url = baseURL, handler = new Function, body = {}, headers = {}) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open(type.toUpperCase(), url);
        
            // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
            Object.entries(headers).forEach(([name, value]) => {
                xhr.setRequestHeader(name, value)
            })
            xhr.addEventListener('load', e => {
                if(xhr.status < 200 || xhr.status >= 300) {
                    return handler(xhr, `Failed with status ${xhr.status}`)
                }
                const res = JSON.parse(xhr.response);
                handler(res, null);
            })
            xhr.send(body);
        } catch (err) {
            console.error(err);
        }
    }

    this.setQuery = function(params = {}) {
        return '?' + Object.entries(params).filter(([,value]) => {
            return value;
        }).map(([name, value]) => {
            return `${name}=${value}`;
        }).join('&');
    }

    // request(`https://news-api-v2.herokuapp.com/everything?q=apple&apiKey=${key23}`)
    // request(`https://news-api-v2.herokuapp.com/top-headlines?country=${code}&apiKey=${apiKey}`)

    // this.request = function(url, callback, body) {
    //     const type = typeof body === 'object' && !Array.isArray(body) ? 'POST' : 'GET';

    // }
}

function request(url = '') {
    const xhr = new XMLHttpRequest();
    return {
        get(callback) {
            try {
                xhr.open('GET', url);
                xhr.addEventListener('load', e => {
                    if(xhr.status < 200 || xhr.status >= 300) {
                        return callback(xhr, `Failed with status ${xhr.status}`)
                    }
                    const res = JSON.parse(xhr.response);
                    callback(res, null);
                })
                xhr.send();
            } catch(err) {
                // console.log(err)
                callback(xhr, err)
            }
            
        },
        post(body = {}, headers = {}, callback) {
            try {
                xhr.open('POST', url);
                Object.entries(headers).forEach(([name, value]) => {
                    xhr.setRequestHeader(name, value)
                })
                xhr.addEventListener('load', e => {
                    if(xhr.status < 200 || xhr.status >= 300) {
                        return callback(xhr, `Failed with status ${xhr.status}`)
                    }
                    const res = JSON.parse(xhr.response);
                    callback(res, null);
                })
                xhr.send(JSON.stringify(body))
            } catch (err) {
                // console.log(err)
                callback(xhr, err)
            }
            
        }
    }
}

const $_$_codesCountryCodes_$_$ = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za'];
