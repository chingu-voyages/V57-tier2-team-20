const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
	async fetch(request, env, ctx) {
		// Parse the URL from the incoming request
		const url = new URL(request.url);

		// Extract the URL from the request
		const query = url.searchParams.get('query');

		// Ensure necessary parameters are present
		if (!query) {
			return new Response('Missing required parameters', {
				status: 400,
				headers: corsHeaders,
			});
		}

		try {
			const response = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
					'Content-Type': 'application/json',
					'User-Agent': 'PRBoard/1.0',
				},
				body: JSON.stringify({ query: decodeURIComponent(query) }),
			});

			if (!response.ok) {
				const error = new Error(response.statusText);
				error.status = response.status;
				return new Response(JSON.stringify({ error: 'Error fetching data' }), {
					status: error.status || 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			const data = await response.json();

			if (!data.data.repository) {
				return new Response(JSON.stringify({ error: 'Error fetching data' }), {
					status: 404,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			return new Response(JSON.stringify(data.data.repository.pullRequests.nodes), { headers: corsHeaders });
		} catch (err) {
			console.error(`Error fetching data: `, err);
			return new Response(JSON.stringify({ error: 'Error fetching data' }), {
				status: err.status || 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
