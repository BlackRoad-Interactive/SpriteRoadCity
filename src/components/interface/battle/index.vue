<template>
  <v-row flex-child wrap>
    <v-col md="12" style="z-index: 0;">
      <Character
      component-type="opponent"
      :agent-index="opponentAgentsSelected"
      :remaining-hp="opponentAgentHp"
      :total-hp="opponentAgentHpMax"
      :remaining-xp="opponentAgentXp"
      :total-xp="opponentAgentXpMax"
      :agent-nb="opponentAgentNb"
      :agent-ko="opponentAgentKo"
      :agent-surname="opponentAgentSurname"
      :agent-level="opponentAgentLevel"
      />
    </v-col>
    <v-spacer></v-spacer>
    <v-col md="12" style="z-index: 0;">
      <Character
      component-type="player"
      :agent-index="playerAgentsSelected"
      :remaining-hp="playerAgentHp"
      :total-hp="playerAgentHpMax"
      :remaining-xp="playerAgentXp"
      :total-xp="playerAgentXpMax"
      :agent-nb="playerAgentNb"
      :agent-ko="playerAgentKo"
      :agent-surname="playerAgentSurname"
      :agent-level="playerAgentLevel"
      />
    </v-col>
    <v-col md="12" class="moves-buttons" :class="{ loading: !(movesLoaded) }">
      <v-container pa-0>
        <v-row>
          <v-col md="12">
            <v-container pa-0>
              <v-row class="battle-btn-layout">
                <v-col
                class="battle-btn"
                :class="{ disabled: movesLaunched }"
                v-for="(move, index) in playerAgentMoves"
                :key="index"
                md="6">
                    <v-btn text
                    :color="move.color[0]"
                    :class="[move.ppLeft === 0 ? 'disabled' : '', { loading: !(movesLoaded) }]"
                    @click="triggerMove($event, index)">
                      {{ move.name }}
                      <span>PP ({{ move.ppLeft }} / {{ move.pp }})</span>
                      <img :src="move.color[1]" :alt="move.color[2]">
                    </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import Character from './Character'

import BugIcn from '@/assets/types/pogo/ico_6_bug.png'
import DarkIcn from '@/assets/types/pogo/ico_16_dark.png'
import DragonIcn from '@/assets/types/pogo/ico_15_dragon.png'
import ElecIcn from '@/assets/types/pogo/ico_12_electric.png'
import FairyIcn from '@/assets/types/pogo/ico_17_fairy.png'
import FightIcn from '@/assets/types/pogo/ico_1_fighting.png'
import FireIcn from '@/assets/types/pogo/ico_9_fire.png'
import FlyIcn from '@/assets/types/pogo/ico_2_flying.png'
import GhostIcn from '@/assets/types/pogo/ico_7_ghost.png'
import GrassIcn from '@/assets/types/pogo/ico_11_grass.png'
import GroundIcn from '@/assets/types/pogo/ico_4_ground.png'
import IceIcn from '@/assets/types/pogo/ico_14_ice.png'
import NormalIcn from '@/assets/types/pogo/ico_0_normal.png'
import PoisonIcn from '@/assets/types/pogo/ico_3_poison.png'
import PsyIcn from '@/assets/types/pogo/ico_13_psychic.png'
import RockIcn from '@/assets/types/pogo/ico_5_rock.png'
import SteelIcn from '@/assets/types/pogo/ico_8_steel.png'
import WaterIcn from '@/assets/types/pogo/ico_10_water.png'

export default {
  name: 'Navigation',
  components: { Character },
  data () {
    return {
      movesLoaded: false,
      movesLaunched: false,
      playerAgentsList: [
        {
          agent: {
            id: 1,
            surname: 'Jean-Joslin'
          },
          stats: {
            level: 21,
            hp: 586,
            hpMax: 665,
            xp: 187,
            xpMax: 658,
            status: null
          },
          moveset: [
            {
              id: 56,
              pp: 2
            },
            {
              id: 50,
              pp: 9
            },
            {
              id: 110,
              pp: 9
            },
            {
              id: 22,
              pp: 2
            }
          ]
        },
        {
          agent: {
            id: 6,
            surname: ''
          },
          stats: {
            level: 88,
            hp: 4860,
            hpMax: 6653,
            xp: 34765,
            xpMax: 65899,
            status: null
          },
          moveset: [
            {
              id: 5,
              pp: 9
            },
            {
              id: 33,
              pp: 2
            }
          ]
        },
        {
          agent: {
            id: 6,
            surname: 'Jean-Ko'
          },
          stats: {
            level: 10,
            hp: 0,
            hpMax: 113,
            xp: 335,
            xpMax: 449,
            status: null
          },
          moveset: [
            {
              id: 88,
              pp: 9
            },
            {
              id: 99,
              pp: 2
            }
          ]
        }
      ],
      playerAgentMoves: [],
      playerAgentsSelected: 0,
      playerAgentHp: null,
      playerAgentHpMax: null,
      playerAgentXp: null,
      playerAgentXpMax: null,
      playerAgentNb: null,
      playerAgentKo: null,
      playerAgentSurname: null,
      playerAgentLevel: null,
      opponentAgentsList: [
        {
          agent: {
            id: 45,
            surname: ''
          },
          stats: {
            level: 65,
            hp: 1286,
            hpMax: 1665,
            xp: 1187,
            xpMax: 1658,
            status: null
          },
          moveset: [
            {
              id: 70,
              pp: 5
            },
            {
              id: 45,
              pp: 5
            },
            {
              id: 33,
              pp: 4
            },
            {
              id: 48,
              pp: 5
            }
          ]
        },
        {
          agent: {
            id: 77,
            surname: 'Roger'
          },
          stats: {
            level: 11,
            hp: 460,
            hpMax: 653,
            xp: 365,
            xpMax: 699,
            status: null
          },
          moveset: [
            {
              id: 77,
              pp: 2
            },
            {
              id: 88,
              pp: 5
            }
          ]
        }
      ],
      opponentAgentMoves: [],
      opponentAgentsSelected: 0,
      opponentAgentHp: null,
      opponentAgentHpMax: null,
      opponentAgentXp: null,
      opponentAgentXpMax: null,
      opponentAgentNb: null,
      opponentAgentKo: null,
      opponentAgentSurname: null,
      opponentAgentLevel: null,
      localPlayerAgentsList: null,
      localOpponentAgentsList: null
    }
  },
  created () {
    // Setup agent list
    if (!(localStorage.playerAgentsList)) {
      localStorage.playerAgentsList = (JSON.stringify(this.playerAgentsList))
    }
    localStorage.opponentAgentsList = (JSON.stringify(this.opponentAgentsList))

    this.localPlayerAgentsList = (JSON.parse(localStorage.playerAgentsList))
    this.localOpponentAgentsList = (JSON.parse(localStorage.opponentAgentsList))

    // Setup Number of agents
    this.playerAgentNb = this.localPlayerAgentsList.length
    this.playerAgentKo = this.localPlayerAgentsList.filter(value => value.stats.hp <= 0).length
    this.opponentAgentNb = this.localOpponentAgentsList.length
    this.opponentAgentKo = this.localOpponentAgentsList.filter(value => value.stats.hp <= 0).length

    // Setup selected agents surnames
    this.playerAgentSurname = this.localPlayerAgentsList[this.playerAgentsSelected].agent.surname
    this.opponentAgentSurname = this.localOpponentAgentsList[this.opponentAgentsSelected].agent.surname

    // Setup selected agents level
    this.playerAgentLevel = this.localPlayerAgentsList[this.playerAgentsSelected].stats.level
    this.opponentAgentLevel = this.localOpponentAgentsList[this.opponentAgentsSelected].stats.level

    // Setup selected agents Hp
    this.playerAgentHpMax = this.localPlayerAgentsList[this.playerAgentsSelected].stats.hpMax
    this.playerAgentHp = this.localPlayerAgentsList[this.playerAgentsSelected].stats.hp
    this.opponentAgentHpMax = this.localOpponentAgentsList[this.opponentAgentsSelected].stats.hpMax
    this.opponentAgentHp = this.localOpponentAgentsList[this.opponentAgentsSelected].stats.hp

    // Setup selected agents Xp
    this.playerAgentXpMax = this.localPlayerAgentsList[this.playerAgentsSelected].stats.xpMax
    this.playerAgentXp = this.localPlayerAgentsList[this.playerAgentsSelected].stats.xp
    this.opponentAgentXpMax = this.localOpponentAgentsList[this.opponentAgentsSelected].stats.xpMax
    this.opponentAgentXp = this.localOpponentAgentsList[this.opponentAgentsSelected].stats.xp
  },
  mounted () {
    this.getAgentMoves(this.localPlayerAgentsList, this.playerAgentsSelected).then((moves) => {
      this.movesLoaded = true
      this.playerAgentMoves = moves
      console.group('Player moves')
      console.table(JSON.parse(JSON.stringify(moves)))
      console.groupEnd()
    })
    this.getAgentMoves(this.localOpponentAgentsList, this.opponentAgentsSelected).then((moves) => {
      this.opponentAgentMoves = moves
      console.group('Opponent moves')
      console.table(JSON.parse(JSON.stringify(moves)))
      console.groupEnd()
    })
  },
  watch: {
    playerAgentsSelected (pkmnSelected) {
      this.movesLoaded = false
      this.playerAgentMoves = []
      const json = this.localPlayerAgentsList
      this.getAgentMoves(json, pkmnSelected).then((moves) => {
        this.movesLoaded = true
        this.playerAgentMoves = moves
        console.group('Player moves')
        console.table(JSON.parse(JSON.stringify(moves)))
        console.groupEnd()
      })
      this.playerAgentHpMax = json[pkmnSelected].stats.hpMax
      this.playerAgentHp = json[pkmnSelected].stats.hp
      this.playerAgentXpMax = json[pkmnSelected].stats.xpMax
      this.playerAgentXp = json[pkmnSelected].stats.xp
      this.playerAgentSurname = json[pkmnSelected].agent.surname
      this.playerAgentLevel = json[pkmnSelected].stats.level
    },
    opponentAgentsSelected (pkmnSelected) {
      const json = this.localOpponentAgentsList
      this.getAgentMoves(json, pkmnSelected).then((moves) => {
        this.opponentAgentMoves = moves
        console.group('Opponent moves')
        console.table(JSON.parse(JSON.stringify(moves)))
        console.groupEnd()
      })
      this.opponentAgentHpMax = json[pkmnSelected].stats.hpMax
      this.opponentAgentHp = json[pkmnSelected].stats.hp
      this.opponentAgentXpMax = json[pkmnSelected].stats.xpMax
      this.opponentAgentXp = json[pkmnSelected].stats.xp
      this.opponentAgentSurname = json[pkmnSelected].agent.surname
      this.opponentAgentLevel = json[pkmnSelected].stats.level
    }
  },
  methods: {
    getAgentMoves (pkmnList, pkmnSelected) {
      return new Promise(async resolve => {
        var movesTemp = []
        for (var index in pkmnList[pkmnSelected].moveset) {
          var moveApiUrl = 'https://pokeapi.co/api/v2/move/' + pkmnList[pkmnSelected].moveset[index].id
          var moveDatas = await this.setAgentMoves(index, moveApiUrl, pkmnList, pkmnSelected, 'fr')
          movesTemp.push(moveDatas)
        }
        resolve(movesTemp)
      })
    },
    setAgentMoves (index, moveApiUrl, pkmnList, pkmnSelected, lang) {
      let moveDatas
      return new Promise(resolve => {
        this.$http.get(moveApiUrl)
          .then(async res => {
            var name = res.data.names.filter(value => value.language.name.includes(lang))[0].name
            var description = res.data.flavor_text_entries.filter(value => value.language.name.includes(lang))[0].flavor_text
            var color = this.setColorFromType(res.data.type.name)
            var type = await this.externalData(res.data.type.url, 'names', lang, 'name')
            moveDatas = {
              name: name,
              type: type,
              color: color,
              description: description,
              power: res.data.power,
              pp: res.data.pp,
              ppLeft: pkmnList[pkmnSelected].moveset[index].pp,
              accuracy: res.data.accuracy,
              criticalHitRate: res.data.meta.crit_rate
            }
            resolve(moveDatas)
          })
      })
    },
    externalData (apiUrl, search, lang, langResult) {
      return new Promise(resolve => {
        this.$http.get(apiUrl)
          .then(res => {
            if (lang && langResult) {
              var result = res.data[search].filter(value => value.language.name.includes(lang))
              resolve(result[0][langResult])
            } else {
              resolve(res.data[search])
            }
          })
      })
    },
    setColorFromType (type) {
      switch (type) {
        case 'bug':
          return (['lime accent-4', BugIcn, type])
        case 'dragon':
          return (['light-blue darken-3', DragonIcn, type])
        case 'dark':
          return (['blue-grey darken-4', DarkIcn, type])
        case 'electric':
          return (['yellow darken-2', ElecIcn, type])
        case 'fairy':
          return (['purple accent-1', FairyIcn, type])
        case 'fighting':
          return (['red', FightIcn, type])
        case 'fire':
          return (['orange lighten-1', FireIcn, type])
        case 'flying':
          return (['light-blue lighten-4', FlyIcn, type])
        case 'ghost':
          return (['indigo lighten-1', GhostIcn, type])
        case 'grass':
          return (['green', GrassIcn, type])
        case 'ground':
          return (['deep-orange darken-4', GroundIcn, type])
        case 'ice':
          return (['cyan lighten-4', IceIcn, type])
        case 'normal':
          return (['grey', NormalIcn, type])
        case 'poison':
          return (['purple darken-1', PoisonIcn, type])
        case 'psychic':
          return (['red lighten-1', PsyIcn, type])
        case 'rock':
          return (['amber accent-1', RockIcn, type])
        case 'steel':
          return (['teal lighten-1', SteelIcn, type])
        case 'water':
          return (['light-blue darken-1', WaterIcn, type])
        default:
          return (['grey', NormalIcn, type])
      }
    },
    triggerMove (event, index) {
      this.movesLaunched = true
      for (var val in this.playerAgentMoves) {
        if (parseInt(val) === index) {
          var ppNewValue = parseInt(this.playerAgentMoves[val].ppLeft) - 1
          var pkmnList = this.localPlayerAgentsList
          this.playerAgentMoves[val].ppLeft = ppNewValue
          pkmnList[this.playerAgentsSelected].moveset[index].pp = ppNewValue
          localStorage.playerAgentsList = (JSON.stringify(pkmnList))
          console.log('Pikatchu, attaque ' + this.playerAgentMoves[val].name + ' !!!!!!!')
        }
      }
      // TODO: calculer les dégats, appliquer les dégats à l'ennemi

      // Fonction timout pour attendre la fin de l'annimation des dégats (1s)
      setTimeout(function () {
        // TODO: lancer l'attaque de l'ennemi ici
        this.movesLaunched = false // a retirer quand c'est fait, il doit être sur false quand l'attaque ennemi est terminée
      }.bind(this), 1000)
    }
  }
}
</script>

<style>
    .battle-btn-layout {
      min-height: 144px;
    }
    .battle-btn {
      opacity: 1;
      transition: 0.5s ease;
    }
    .battle-btn.loading {
      opacity: 0;
      pointer-events: none;
    }
    .battle-btn.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
    .battle-btn > button {
      width: 100%;
      overflow: hidden;
    }
    .battle-btn > button.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
    .battle-btn > button > span {
      justify-content: flex-start;
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > span {
      padding-left: 45px;
    }
    .battle-btn > button > span > span {
      margin-left: auto;
    }
    .battle-btn > button > span > img {
      position: absolute;
      left: 0px;
      z-index: 10;
      opacity: 0.0;
      transform: scale(0.9) translateX(-80px);
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > span > img {
      opacity: 1;
      transform: scale(0.9) translateX(-30px);
    }

    .battle-btn-layout > .battle-btn:not(.loading) {
      animation: FadeIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-fill-mode: both;
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(1) {
      animation-delay: 0.2s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(2) {
      animation-delay: 0.4s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(3) {
      animation-delay: 0.6s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(4) {
      animation-delay: 0.8s
    }

    .moves-buttons {
      background-color: rgba(255,255,255,0.95);
      z-index: 1;
      margin-top: 0px;
      box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
      backdrop-filter: blur(5px);
      opacity: 1;
      transition: 0.2s ease;
    }
    .moves-buttons.loading {
      opacity: 1;
    }

    @keyframes FadeIn {
      0% {
        opacity: 0;
        transform: translateY(40px);
      }
      85% {
        opacity: 1;
      }
      100% {
        transform: translateY(0px);
      }
    }
</style>
