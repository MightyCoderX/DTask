export function errorHandler(err, req, res, next)
{
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    const data = {
        message: err.message
    };

    if(process.env.NODE_ENV === 'development')
    {
        data.stack = err.stack;
        console.log(err);
    }

    res.json(data);
}