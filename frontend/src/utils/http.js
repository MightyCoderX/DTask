export async function tryFetchJson(url, options, errReturnValue)
{
    if(['POST', 'PUT'].includes(options.method))
    {
        if(!options.headers) options.headers = {};
        if(options.body instanceof FormData)
        {
            const formData = options.body;
            options.body = {};

            formData.forEach((value, key) =>
            {
                options.body[key] = value;
            });
        }

        if(typeof options.body === 'object')
        {
            options.body = JSON.stringify(options.body);
        }

        options.headers['Content-Type'] = 'application/json';
    }

    try
    {
        const res = await fetch(url, options);

        const data = await (res).json();
        return data;
    }
    catch(err)
    {
        console.error(err);
        return errReturnValue;
    }
}