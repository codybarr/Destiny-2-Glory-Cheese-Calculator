<template>
	<input
		:value="value"
		@input="update"
		type="number"
		class="input flex-grow"
		placeholder="Enter glory"
	/>
</template>

<script>
import { required, numeric, minLength, between } from 'vuelidate'

export default {
	name: 'glory-input',
	props: {
		value: {
			default: ''
		}
	},
	validations: {
		value: {
			required,
			numeric
		}
	},
	methods: {
		update($event) {
			this.$emit('input', $event.target.value)
			this.$v.value.touch()
		}
	}
}
</script>

<style lang="postcss">
.input {
	/* @apply m-1 mb-3 p-2 border border-gray-500 border-solid rounded; */
	@apply m-2 mb-3 bg-teal-800 text-white appearance-none border-2 border-gray-500 rounded py-2 px-4 leading-tight;
	&:focus {
		@apply outline-none bg-teal-700 border-white;
	}

	&.has-error {
		@apply border-red-700;
	}

	&.is-valid {
		@apply border-green-300;
	}
}
</style>