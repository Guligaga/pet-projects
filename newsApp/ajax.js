function Ajax(baseURL = 'https://api.net') {
    this.get = function(...args) {
        if(typeof args[args.length - 1] !== 'function') {
            args.push(() => {});
        }
        const onloadHandler = args.pop();
        const url = (baseURL + '/' + args.join('/')).replace('/?', '?');
        this.xhr('get', url, onloadHandler);
    };

    this.post = function(...args) {
        if(typeof args[args.length - 1] !== 'function') {
            args.push(() => {});
        }
        const onloadHandler = args.pop();
        const body = JSON.stringify(args.pop());
        const headers = args.pop();
        const url = (baseURL + '/' + args.join('/')).replace('/?', '?');
        this.xhr('post', url, onloadHandler, body), headers;
    };

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
    };

    this.setQuery = function(params = {}) {
        return '?' + Object.entries(params).filter(([,value]) => {
            return value;
        }).map(([name, value]) => {
            return `${name}=${value}`;
        }).join('&');
    }

}
