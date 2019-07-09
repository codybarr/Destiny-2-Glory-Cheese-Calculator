<template>
	<div>
		<article class="w-full text-center my-10 mx-auto">
			<h1>Current Teams</h1>
			<section class="flex flex-wrap max-w-4xl mx-auto">
				<section class="flex flex-col m-2 w-full md:w-1/2 mx-auto">
					<h2 class="m-4">Team 1</h2>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-red-300 px-2">1.</strong>
						<input
							v-model.number="glory1"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-red-300 px-2">2.</strong>
						<input
							v-model.number="glory2"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-red-300 px-2">3.</strong>
						<input
							v-model.number="glory3"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-red-300 px-2">4.</strong>
						<input
							v-model.number="glory4"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<p class="m-2">Average: {{ team1average || 0 }}</p>
				</section>
				<section class="flex flex-col m-2 w-full md:w-1/2 mx-auto">
					<h2 class="m-4">Team 2</h2>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-blue-300 px-2">5.</strong>
						<input
							v-model.number="glory5"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-blue-300 px-2">6.</strong>
						<input
							v-model.number="glory6"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-blue-300 px-2">7.</strong>
						<input
							v-model.number="glory7"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<div class="flex flex-row items-center">
						<strong class="mx-2 bg-blue-300 px-2">8.</strong>
						<input
							v-model.number="glory8"
							type="number"
							class="input flex-grow"
							placeholder="Enter glory"
						/>
					</div>
					<p class="m-2">Average: {{ team2average || 0 }}</p>
				</section>
			</section>
			<p v-if="difference">
				<strong>Difference: {{ difference }}</strong>
			</p>

			<button @click="calculateTeams" class="button mt-4" :disabled="empty">Calculate New Teams</button>

			<div v-if="newTeams && newTeams.length" class="my-5">
				<h1>New Teams</h1>
				<div class="overflow-hidden">
					<div class="flex flex-wrap justify-center -mx-2 px-4">
						<div v-for="(team, index) of newTeams" :key="index" class="w-full md:w-1/2 lg:w-1/3 p-2">
							<div class="border border-blue-200 border-solid rounded p-4">
								<div class="flex flex-row">
									<div class="w-full m-2">
										<h2 class="whitespace-no-wrap mb-2">Team 1</h2>
										<div class="w-3/4 mx-auto">
											<div
												v-for="(player, index) of team.team1.players"
												:key="index"
												class="w-full p-1 text-left"
											>
												<strong
													:class="[isTeamOne(player.position) ? 'has-red-bg' : 'has-blue-bg']"
												>{{player.position}}</strong>
												{{ player.glory }}
											</div>
										</div>
									</div>
									<div class="w-full m-2">
										<h2 class="whitespace-no-wrap mb-2">Team 2</h2>
										<div class="w-3/4 mx-auto">
											<div
												v-for="(player, index) of team.team2.players"
												:key="index"
												class="w-full p-1 text-left"
											>
												<strong
													:class="[isTeamOne(player.position) ? 'has-red-bg' : 'has-blue-bg']"
												>{{player.position}}</strong>
												{{ player.glory }}
											</div>
										</div>
									</div>
								</div>
								<div>
									Difference:
									<strong>{{ team.glory_difference }}</strong>
								</div>
							</div>
						</div>
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
			// glory1: 4321,
			// glory2: 233,
			// glory3: 1700,
			// glory4: 2100,
			// glory5: 3800,
			// glory6: 600,
			// glory7: 1200,
			// glory8: 1945,
			glory1: '',
			glory2: '',
			glory3: '',
			glory4: '',
			glory5: '',
			glory6: '',
			glory7: '',
			glory8: '',
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
		team1empty() {
			return (
				this.glory1 == '' ||
				this.glory2 == '' ||
				this.glory3 == '' ||
				this.glory4 == ''
			)
		},
		team2empty() {
			return (
				this.glory5 == '' ||
				this.glory6 == '' ||
				this.glory7 == '' ||
				this.glory8 == ''
			)
		},
		empty() {
			return this.team1empty || this.team2empty
		},
		team1average() {
			return this.team1empty
				? 0
				: (
						(this.glory1 +
							this.glory2 +
							this.glory3 +
							this.glory4) /
						4
				  ).toFixed(1)
		},
		team2average() {
			return this.team2empty
				? 0
				: (
						(this.glory5 +
							this.glory6 +
							this.glory7 +
							this.glory8) /
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
		isTeamOne(number) {
			return number === 1 || number === 2 || number === 3 || number === 4
		},
		calculateTeams() {
			const values = [
				{ position: 1, orig_team: 1, glory: this.glory1 },
				{ position: 2, orig_team: 1, glory: this.glory2 },
				{ position: 3, orig_team: 1, glory: this.glory3 },
				{ position: 4, orig_team: 1, glory: this.glory4 },
				{ position: 5, orig_team: 2, glory: this.glory5 },
				{ position: 6, orig_team: 2, glory: this.glory6 },
				{ position: 7, orig_team: 2, glory: this.glory7 },
				{ position: 8, orig_team: 2, glory: this.glory8 }
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
						team1_sum += player.glory
					}

					for (let player of team2_players) {
						team2_sum += player.glory
					}

					// swap team 1 with team 2 if team 1 has more people that started in team 2
					let swap = team1_players.filter(player => {
						return player.orig_team === 2
					})

					if (swap.length > 2) {
						let cloneteam1 = team1_players.clone()
						team1_players = team2_players
						team2_players = cloneteam1
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

			// filter out duplicate glory differences
			teams = _.uniqBy(teams, 'glory_difference')

			// sort teams by lowest glory difference
			teams = _.sortBy(teams, ['glory_difference'])

			// grab only the top 3 arrangements with lowest glory difference
			teams = teams.splice(0, 3)

			// sort players by original position
			for (let team of teams) {
				team.team1.players = _.sortBy(team.team1.players, ['position'])
				team.team2.players = _.sortBy(team.team2.players, ['position'])
			}
			// team1_players = _.sortBy(team1_players, ['position'])
			// team2_players = _.sortBy(team2_players, ['position'])

			this.newTeams = teams
		}
	}
}
</script>

<style lang="postcss">
.input {
	/* @apply m-1 mb-3 p-2 border border-gray-500 border-solid rounded; */
	@apply m-2 mb-3 appearance-none border-2 border-gray-500 rounded py-2 px-4 text-gray-700 leading-tight;
	&:focus {
		@apply outline-none bg-white border-blue-500;
	}

	&.has-error {
		@apply border-red-700;
	}

	&.is-valid {
		@apply border-green-300;
	}
}

.has-red-bg {
	@apply bg-red-300 px-2 mr-2;
}

.has-blue-bg {
	@apply bg-blue-300 px-2 mr-2;
}

.button {
	@apply bg-blue-500 text-white font-bold py-2 px-4 rounded;

	&:hover {
		@apply bg-blue-700;
	}

	&:disabled {
		@apply bg-gray-300;

		&:hover {
			@apply bg-gray-300 cursor-not-allowed;
		}
	}
}
</style>

