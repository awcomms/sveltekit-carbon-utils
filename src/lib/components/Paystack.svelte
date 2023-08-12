<script lang="ts">
	import { PUBLIC_PAYSTACK_PK_LIVE, PUBLIC_PAYSTACK_PK_TEST, PUBLIC_PAYSTACK_TEST } from '$env/static/public';
	interface Args {
		email: string;
		amount: number;
		metadata?: unknown;
		currency: 'NGN' | 'GHS' | 'ZAR' | 'USD';
	}

	import { createEventDispatcher } from 'svelte';
	import { v4 } from 'uuid';

	const dispatch = createEventDispatcher();

	export const request_payment = ({ email, amount, metadata, currency }: Args) => {
		PaystackPop.setup({
			//TODO-window_type
			key: PUBLIC_PAYSTACK_TEST ? PUBLIC_PAYSTACK_PK_TEST : PUBLIC_PAYSTACK_PK_LIVE,
			email,
			metadata,
			currency,
			channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
			amount: amount * 100,
			ref: v4(),
			callback: (response) => {
				dispatch('paid', response.reference);
			},
			onClose: () => dispatch('close')
		}).openIframe();
	};
</script>

<svelte:head>
	<script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>