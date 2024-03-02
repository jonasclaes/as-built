import { ZodError } from 'zod';

export const successResponse = (data: unknown, status: number = 200) => {
	return new Response(
		JSON.stringify({
			success: true,
			data
		}),
		{ status, headers: { 'Content-Type': 'application/json' } }
	);
};

export const errorResponse = (error: unknown, status: number = 500) => {
	if (error instanceof ZodError) {
		return createErrorResponse(
			{
				name: 'ValidationError',
				issues: error.issues
			},
			400
		);
	}

	if (error instanceof Error) {
		return createErrorResponse(
			{
				name: error.name,
				message: error.message
			},
			status
		);
	}

	return createErrorResponse(error, status);
};

const createErrorResponse = (error: unknown, status: number = 500) => {
	return new Response(
		JSON.stringify({
			success: false,
			error
		}),
		{ status, headers: { 'Content-Type': 'application/json' } }
	);
};
