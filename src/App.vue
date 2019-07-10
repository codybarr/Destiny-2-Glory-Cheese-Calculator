<template>
	<div id="app">
		<Navbar />
		<CurrentTeams />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CurrentTeams from '@/components/CurrentTeams.vue'

export default {
	name: 'app',
	components: {
		Navbar,
		CurrentTeams
	}
}
</script>

<style lang="scss">
</style>
