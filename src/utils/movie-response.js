    export function movieRes(res, data) {
        return res.status(200).json({
            statusCode: 200,
            data
        });
    }