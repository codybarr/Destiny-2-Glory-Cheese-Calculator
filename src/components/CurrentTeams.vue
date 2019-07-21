<template>
	<div>
		<article class="w-full text-center my-10 mx-auto">
			<h1>Current Teams</h1>
			<div class="overflow-hidden">
				<section class="flex flex-wrap justify-center items-center -mx-4 px-8">
					<section class="flex flex-col w-full md:w-1/2 p-4">
						<h2 class="m-4">Team 1</h2>
						<div v-for="(num, index) of [0, 1, 2, 3]" :key="index" class="flex flex-row items-center">
							<strong class="has-red-bg">{{ num+1 }}</strong>
							<glory-input v-model.number="glory[num]" />
						</div>
						<p class="m-2">
							Avg:
							<strong>{{ team1average || 0 }}</strong>
						</p>
					</section>
					<section class="flex flex-col w-full md:w-1/2 p-4">
						<h2 class="m-4">Team 2</h2>
						<div v-for="(num, index) of [4, 5, 6, 7]" :key="index" class="flex flex-row items-center">
							<strong class="has-blue-bg">{{ num+1 }}</strong>
							<glory-input v-model.number="glory[num]" />
						</div>
						<p class="m-2">
							Avg:
							<strong>{{ team2average || 0 }}</strong>
						</p>
					</section>
				</section>
			</div>
			<p v-if="difference">
				Diff:
				<strong>{{ difference }}</strong>
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
												class="w-full p-1 text-left mb-1"
											>
												<strong
													:class="[isTeamOne(player.position) ? 'has-red-bg' : 'has-blue-bg']"
												>{{player.position}}</strong>
												{{ player.glory }}
											</div>
										</div>
										<p class="m-2">
											Avg:
											<strong>{{ team.team1.average }}</strong>
										</p>
									</div>
									<div class="w-full m-2">
										<h2 class="whitespace-no-wrap mb-2">Team 2</h2>
										<div class="w-3/4 mx-auto">
											<div
												v-for="(player, index) of team.team2.players"
												:key="index"
												class="w-full p-1 text-left mb-1"
											>
												<strong
													:class="[isTeamOne(player.position) ? 'has-red-bg' : 'has-blue-bg']"
												>{{player.position}}</strong>
												{{ player.glory }}
											</div>
										</div>
										<p class="m-2">
											Avg:
											<strong>{{ team.team2.average }}</strong>
										</p>
									</div>
								</div>
								<div>
									Diff:
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
import GloryInput from '@/components/GloryInput.vue'

export default {
	name: 'CurrentTeams',
	components: {
		GloryInput
	},
	data() {
		return {
			// for testing
			// glory: [
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory(),
			// 	this.randomGlory()
			// ],
			glory: ['', '', '', '', '', '', '', ''],
			newTeams: []
		}
	},
	computed: {
		team1empty() {
			return (
				this.glory[0] == '' ||
				this.glory[1] == '' ||
				this.glory[2] == '' ||
				this.glory[3] == ''
			)
		},
		team2empty() {
			return (
				this.glory[4] == '' ||
				this.glory[5] == '' ||
				this.glory[6] == '' ||
				this.glory[7] == ''
			)
		},
		empty() {
			return this.team1empty || this.team2empty
		},
		team1average() {
			return this.team1empty
				? 0
				: _.round(
						(this.glory[0] +
							this.glory[1] +
							this.glory[2] +
							this.glory[3]) /
							4,
						1
				  )
		},
		team2average() {
			return this.team2empty
				? 0
				: _.round(
						(this.glory[4] +
							this.glory[5] +
							this.glory[6] +
							this.glory[7]) /
							4,
						1
				  )
		},
		difference() {
			return (
				_.round(Math.abs(this.team1average - this.team2average), 1) ||
				null
			)
		}
	},
	methods: {
		randomGlory() {
			return Math.floor(Math.random() * 2501)
		},
		isTeamOne(number) {
			return number === 1 || number === 2 || number === 3 || number === 4
		},
		calculateTeams() {
			const values = this.glory.map((glory, index) => {
				return {
					position: index + 1,
					orig_team: index < 4 ? 1 : 2,
					glory
				}
			})
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

					team.glory_difference = _.round(
						Math.abs(team.team1.average - team.team2.average),
						1
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
.has-red-bg {
	@apply bg-red-600 px-2 mr-2 rounded inline-block;
}

.has-blue-bg {
	@apply bg-blue-600 px-2 mr-2 rounded inline-block;
}

.button {
	@apply bg-blue-600 text-white font-bold py-2 px-4 rounded;

	&:hover {
		@apply bg-blue-500;
	}

	&:disabled {
		@apply bg-gray-400;

		&:hover {
			@apply bg-gray-400 cursor-not-allowed;
		}
	}
}
</style>

