/**
 * Cloudflare Pages Function - GitHub OAuth Token Exchange
 * 
 * Deploy to Cloudflare Pages at: functions/exchange-token.js
 * 
 * Environment variables needed:
 * - GITHUB_CLIENT_SECRET: Your GitHub OAuth App's Client Secret
 * 
 * Usage:
 * POST /api/exchange-token
 * Body: { code, client_id, redirect_uri }
 */

export async function onRequest(context) {
    if (context.request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const body = await context.request.json();
        const { code, client_id, redirect_uri } = body;

        if (!code || !client_id || !redirect_uri) {
            return new Response(JSON.stringify({
                error: 'missing_parameters',
                error_description: 'Missing required parameters: code, client_id, redirect_uri'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 从环境变量获取 Client Secret
        const clientSecret = context.env.GITHUB_CLIENT_SECRET;
        if (!clientSecret) {
            console.error('GITHUB_CLIENT_SECRET environment variable not set');
            return new Response(JSON.stringify({
                error: 'server_error',
                error_description: 'Server configuration error'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 向 GitHub 交换 token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id,
                client_secret: clientSecret,
                code,
                redirect_uri
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
            // 成功获取 token
            return new Response(JSON.stringify({
                access_token: tokenData.access_token,
                token_type: tokenData.token_type || 'bearer',
                scope: tokenData.scope
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                }
            });
        } else {
            // GitHub 返回错误
            return new Response(JSON.stringify({
                error: tokenData.error || 'unknown_error',
                error_description: tokenData.error_description || 'Failed to exchange token'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('Token exchange error:', error);
        return new Response(JSON.stringify({
            error: 'server_error',
            error_description: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
