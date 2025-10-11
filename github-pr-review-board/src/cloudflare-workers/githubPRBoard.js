import { Octokit } from '@octokit/rest';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		// Parse the URL from the incoming request
		const url = new URL(request.url);

		// Extract the URL from the request
		const urlEndpoint = url.searchParams.get('url');

		// Ensure necessary parameters are present
		if (!urlEndpoint) {
			return new Response('Missing required parameters', {
				status: 400,
				headers: corsHeaders,
			});
		}

		const octokit = new Octokit({
			auth: env.GITHUB_TOKEN,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		try {
			const response = await octokit.request(decodeURIComponent(urlEndpoint));
			return new Response(JSON.stringify(response.data), { headers: corsHeaders });
		} catch (err) {
			console.error(`Error fetching data: `, err);
			return new Response(JSON.stringify({ error: 'Error fetching data'}), {
				status: err.status || 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
