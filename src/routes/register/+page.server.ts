import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const prismaClient = new PrismaClient();
		const data = await event.request.formData();

		const email = data.get('email') as string;
		const name = data.get('name') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			const user = await prismaClient.user.create({
				data: {
					email,
					name,
					password: hashedPassword
				}
			});

			const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' }); // TODO: move secret to .env
			event.cookies.set('session', token);

			return {
				body: {
					user
				}
			};
		} catch (error) {
			return fail(400, { message: 'User already exists' });
		}
	}
} satisfies Actions;
