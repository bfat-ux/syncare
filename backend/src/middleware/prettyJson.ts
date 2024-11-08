import { Request, Response, NextFunction } from 'express';

export const prettyJson = (req: Request, res: Response, next: NextFunction) => {
    // Only apply to JSON responses
    const originalJson = res.json;
    res.json = function (body: any) {
        if (req.accepts('html') && !req.xhr) {
            res.setHeader('Content-Type', 'text/html');
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Patient Data</title>
                    <style>
                        body {
                            font-family: monospace;
                            padding: 20px;
                            background: #f5f5f5;
                        }
                        pre {
                            background: white;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            overflow-x: auto;
                        }
                    </style>
                </head>
                <body>
                    <pre>${JSON.stringify(body, null, 2)}</pre>
                </body>
                </html>
            `);
        }
        return originalJson.call(this, body);
    };
    next();
};