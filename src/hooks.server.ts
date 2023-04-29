import type { Handle } from '@sveltejs/kit';
import * as jwt from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	const token = event.cookies.get('session');
	if (token !== undefined) {
		const user = jwt.verify(token, 'secret') as { id: number; email: string };
		if (user !== undefined && user) {
			event.locals.user = {
				id: user.id,
				email: user.email
			};
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
