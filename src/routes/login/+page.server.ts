import { PrismaClient } from '@prisma/client';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const prismaClient = new PrismaClient();
		const data = await event.request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const user = await prismaClient.user.findUnique({
			where: {
				email
			}
		});

		if (user === null) {
			return fail(400, { message: 'User does not exist' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return fail(400, { message: 'Incorrect password' });
		}

		const token = jwt.sign({ id: user.id, email: user.email }, 'secret');
		event.cookies.set('session', token);

		throw redirect(302, '/mypage');
	}
} satisfies Actions;
