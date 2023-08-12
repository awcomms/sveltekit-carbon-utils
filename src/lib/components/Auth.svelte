<script lang="ts">
	export let hide_new_user_toggle = false,
		username_helper_text = '',
		email_helper_text = '',
		password_helper_text = '',
		new_user = false,
		button_text = '',
		sign_in_after = false;
	import axios from 'axios';
	import {
		Button,
		Column,
		FluidForm,
		InlineLoading,
		PasswordInput,
		Row,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { notify } from '$lib/util/index.js';
	let username = '',
		password = '',
		password2 = '',
		password2_invalid = false,
		email = '',
		sending = false,
		username_invalid = false,
		checking_username = false,
		username_invalid_text = '';

	interface Args {
		username: string;
		password: string;
		email?: string;
	}

	$: validate_username(new_user);

	const validate_username = (_: any) => (username_invalid = false);

	const dispatch = createEventDispatcher();

	const show_username_taken = () => {
		username_invalid = true;
		username_invalid_text = 'This username is already taken';
	};

	const check_username = () => {
		checking_username = true;
		axios
			.post('/username_taken', username)
			.then(({ data }) => {
				if (data) show_username_taken();
			})
			.finally(() => (checking_username = false));
	};

	const sign_in = async ({ username, password }: Pick<Args, 'username' | 'password'>) => {
		axios
			.post('/auth/sign_in', { username, password })
			.then((r) => {
				dispatch('in');
				return;
			})
			.catch((e) => {
				console.log(typeof e.response.data.message, e.response.data.message);
				notify({ title: 'Login error', subtitle: e.response.data.message, kind: 'error' });
				return;
			});
	};

	const create_new_user = async ({ username, password, email }: Required<Args>) => {
		sending = true;
		if (password !== password2) {
			password2_invalid = true;
			return;
		}
		return await axios
			.post('/auth/new-user', { email, username, password })
			.then(async ({ data, status }) => {
				console.log(data, status);
				if (data.username_error) {
					show_username_taken();
					return;
				}
				dispatch('new_user_created', { email, username, id: data });
			})
			.finally(() => (sending = false));
	};
</script>

<Row>
	<Column>
		<div class="content">
			{#if $page.data.user?.username}
				<p>Currently logged in as {$page.data.user.username}</p>
			{/if}
			{#if !hide_new_user_toggle}
				<Toggle bind:toggled={new_user} labelText="New user" />
			{/if}
			<FluidForm>
				{#if new_user}
					<TextInput
						light
						helperText={email_helper_text}
						disabled={sending}
						bind:value={email}
						labelText="Email"
					/>
				{/if}
				<div class="username">
					<TextInput
						light
						disabled={sending}
						bind:value={username}
						helperText={username_helper_text}
						invalid={username_invalid}
						invalidText={username_invalid_text}
						on:blur={() => {
							if (new_user) check_username();
						}}
						on:input={() => (username_invalid = false)}
						labelText="Username"
					/>
					{#if checking_username}
						<div class="inline-loading-container">
							<InlineLoading />
						</div>
					{/if}
				</div>
				<PasswordInput
					light
					helperText={password_helper_text}
					disabled={sending}
					bind:value={password}
					labelText="Password"
				/>
				{#if new_user}
					<PasswordInput
						light
						disabled={sending}
						invalid={password2_invalid}
						invalidText="Let the passwords match"
						bind:value={password2}
						on:input={() => (password2_invalid = false)}
						on:blur={() => (password2_invalid = password !== password2)}
						labelText="Repeat Password"
					/>
				{/if}
				<Button
					disabled={sending || username_invalid || password2_invalid}
					icon={sending ? InlineLoading : Send}
					on:click={async () => {
						sending = true;
						if (new_user) {
							await create_new_user({ email, username, password }).then(() => {
								if (sign_in_after) sign_in({ username, password });
							});
						} else sign_in({ username, password });
					}}>{button_text ? button_text : new_user ? 'Register' : 'Login'}</Button
				>
			</FluidForm>
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	.form
		// width: 74%
	// .confirming
	// 	display: flex
	// 	flex-direction: column
	// 	align-items: center
	.content
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-03
		width: 100%
	.username
		min-width: 100%
		display: flex
		flex-direction: row
	.inline-loading-container
		display: flex
		width: min-content
		align-items: center
		justify-content: center
		padding: 0 layout.$spacing-06
</style>
