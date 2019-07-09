<template>
	<div>
		<article class="w-full max-w-3xl text-center m-10 mx-auto">
			<h1>Current Teams</h1>
			<section class="flex flex-wrap">
				<section class="flex flex-col m-2 w-full md:w-1/2 mx-auto">
					<h2 class="m-4">Team 1</h2>
					<input v-model.number="glory1" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory2" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory3" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory4" type="number" class="input" placeholder="Enter glory" />
					<p class="m-2">Average: {{ team1average || 0 }}</p>
				</section>
				<section class="flex flex-col m-2 w-full md:w-1/2 mx-auto">
					<h2 class="m-4">Team 2</h2>
					<input v-model.number="glory5" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory6" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory7" type="number" class="input" placeholder="Enter glory" />
					<input v-model.number="glory8" type="number" class="input" placeholder="Enter glory" />
					<p class="m-2">Average: {{ team2average || 0 }}</p>
				</section>
			</section>
			<p v-if="difference">
				<strong>Difference: {{ difference }}</strong>
			</p>
			<button @click="calculateTeams" class="button mt-4">Calculate New Teams</button>
			<div v-if="newTeams && newTeams.length" class="flex flex-wrap justify-center">
				<div
					v-for="(team, index) of newTeams"
					:key="index"
					class="m-4 p-4 border border-blue-200 border-solid rounded"
				>
					<div class="flex flex-row">
						<div class="m-2">
							<h2 class="whitespace-no-wrap mb-2 mx-2">New Team 1</h2>
							<div v-for="(player, index) of team.team1.players" :key="index" class="p-1">{{ player }}</div>
						</div>
						<div class="m-2">
							<h2 class="whitespace-no-wrap mb-2 mx-2">New Team 2</h2>
							<div v-for="(player, index) of team.team2.players" :key="index" class="p-1">{{ player }}</div>
						</div>
					</div>
					<div>
						Glory Difference:
						<strong>{{ team.glory_difference }}</strong>
					</div>
				</div>
			</div>
		</article>
	</div>
</template>

<script>
const _ = require('lodash')
import { required, numeric, minLength, between } from 'vuelidate/lib/validators'

export default {
	name: 'CurrentTeams',
	data() {
		return {
			// for testing
			glory1: 4321,
			glory2: 233,
			glory3: 1700,
			glory4: 2100,
			glory5: 3800,
			glory6: 600,
			glory7: 1200,
			glory8: 1945,
			// glory1: 0,
			// glory2: 0,
			// glory3: 0,
			// glory4: 0,
			// glory5: 0,
			// glory6: 0,
			// glory7: 0,
			// glory8: 0,
			newTeams: []
		}
	},
	validations: {
		glory1: {
			required,
			numeric
		}
	},
	computed: {
		team1average() {
			return (
				(this.glory1 + this.glory2 + this.glory3 + this.glory4) /
				4
			).toFixed(1)
		},
		team2average() {
			return (
				(this.glory5 + this.glory6 + this.glory7 + this.glory8) /
				4
			).toFixed(1)
		},
		difference() {
			return (
				Math.abs(this.team1average - this.team2average).toFixed(1) ||
				null
			)
		}
	},
	methods: {
		calculateTeams() {
			const values = [
				this.glory1,
				this.glory2,
				this.glory3,
				this.glory4,
				this.glory5,
				this.glory6,
				this.glory7,
				this.glory8
			]
			let teams = []

			for (let i = 0; i < 8; i++) {
				let temp_team = values.clone()
				let leader = temp_team.splice(i, 1)[0]

				for (let j = 0; j < 5; j++) {
					let new_temp_team = temp_team.clone()
					let team1_players = new_temp_team.splice(j, 3)
					team1_players.push(leader)

					let team2_players = new_temp_team

					let team1_sum = 0
					let team2_sum = 0

					for (let player of team1_players) {
						team1_sum += player
					}

					for (let player of team2_players) {
						team2_sum += player
					}

					let team = {
						team1: {
							players: team1_players,
							average: team1_sum / 4
						},
						team2: {
							players: team2_players,
							average: team2_sum / 4
						}
					}

					team.glory_difference = Math.abs(
						team.team1.average - team.team2.average
					)
					teams.push(team)
				}
			}

			teams = _.uniqBy(teams, 'glory_difference')
			teams = _.sortBy(teams, ['glory_difference'])

			this.newTeams = teams.splice(0, 3)
		}
	}
}
</script>

<style>
.input {
	@apply m-1 mb-3 p-2 border border-gray-500 border-solid rounded;

	&.has-error {
		@apply border-red-700;
	}

	&.is-valid {
		@apply border-green-300;
	}
}

.button {
	@apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
.button:hover {
	@apply bg-blue-700;
}
</style>

