import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (({ locals, cookies }) => {
	cookies.set('session', '', { maxAge: -1 });
	locals.user = undefined;
	throw redirect(303, '/');
}) satisfies RequestHandler;
