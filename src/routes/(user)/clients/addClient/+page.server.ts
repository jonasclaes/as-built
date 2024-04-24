import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { KVConfig } from '$lib/server/config/kvConfig';
import { getSystemDatabaseStrategy } from '$lib/server/database';
import { ClientRepository } from '$lib/server/repository/clients';

const schema = z.object({
    name: z.string()
});

export const load = (async () => {
    const form = await superValidate(zod(schema));
    return { form };
});

import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request } : {request : Request}) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    const clientRepository = new ClientRepository(
      KVConfig.getInstance().getKeyValueStoreStrategy(),
      getSystemDatabaseStrategy()
  );
    await clientRepository.createClient(form.data);

    return message(form, 'Client added successfully!');
  }
};