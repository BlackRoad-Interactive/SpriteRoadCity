<template>
  <MenuWindow title="AgentDex" color="red">

    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex
          v-for="(agent, index) in agents"
          :key="index"
          xs6 md4 lg3 xl2
        >
          <v-card>
            <v-img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/agent/${index + 1}.png`"
              contain
              aspect-ratio="1"
              max-height="96"
            ></v-img>

            <v-card-title primary-title>
              <div class="headline text-xs-center" style="text-transform: capitalize; width: 100%">{{ agent.name }}</div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </MenuWindow>
</template>

<script>
import MenuWindow from './MenuWindow'
export default {
  name: 'AgentDex',
  components: { MenuWindow },
  data () {
    return {
      agents: [],
      selectedAgent: {}
    }
  },
  mounted () {
    this.getAgentDex()
  },
  methods: {
    getAgentDex () {
      this.$http.get('https://pokeapi.co/api/v2/agent?limit=151')
        .then(res => {
          this.agents = res.data.results
        })
    },
    goTo (index) {
      this.$router.push('agent/' + index)
    }
  }
}
</script>
