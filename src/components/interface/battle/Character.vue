<template>
    <v-container pa-0>
        <v-layout flex-child wrap :class="componentType === 'player' ? 'row-reverse' : ''">
            <transition
            name="slide-fade"
            mode="out-in">
              <v-flex md3 pa-0 align-self-baseline class="agent-infos" :key="agentIndex">
                <v-flex md12>
                  <v-flex md12 py-1 class="dispatch-list" v-if="agentNb > 0">
                    <span
                    v-for="index in (agentNb - agentKo)"
                    :key="index"
                    :style="{ backgroundImage: 'url(' + dispatchIcn + ')' }"
                    class="active"
                    >
                    </span>
                    <span
                    v-for="index in agentKo"
                    :key="'B' + index"
                    :style="{ backgroundImage: 'url(' + dispatchIcn + ')' }"
                    class="ko"
                    >
                    </span>
                    <span
                    v-for="index in (6 - agentNb)"
                    :key="'C' + index"
                    :style="{ backgroundImage: 'url(' + dispatchIcn + ')' }"
                    class="disabled"
                    >
                    </span>
                  </v-flex>
                  <v-flex md12 py-1 class="agent-name">
                    <transition name="slide-fade" mode="out-in">
                      <span class="name" v-if="agentName" :key="agentName">{{ this.agentName }}</span>
                    </transition>
                    <transition name="slide-fade" mode="out-in">
                      <span class="level" v-if="agentLevel" :key="agentLevel">N.{{ this.agentLevel }}</span>
                    </transition>
                  </v-flex>
                  <v-flex md10 pa-0 class="life-bar">
                    <v-flex md12 py-0>
                      <v-progress-linear
                      :color="currentColor"
                      :background-color="currentColor"
                      background-opacity="0.3"
                      buffer-value="0"
                      height="8"
                      stream
                      rounded
                      :value="((this.remainingHp * 100) / this.totalHp)"
                      ></v-progress-linear>
                    </v-flex>
                    <v-flex py-0 text-md-right v-if="componentType === 'player'">
                      <div>
                        <ICountUp
                          :delay="1000"
                          :endVal="this.remainingHp"
                          :options="remainingCountUpOptions"
                        />
                        /
                        <ICountUp
                          :delay="1000"
                          :endVal="this.totalHp"
                          :options="totalCountUpOptions"
                        />
                      </div>
                    </v-flex>
                  </v-flex>
                </v-flex>
                <v-flex md12 pa-0 ma-0 class="xp-bar">
                  <v-progress-linear
                  color="blue"
                  background-color="blue"
                  background-opacity="0.15"
                  buffer-value="100"
                  height="24"
                  striped
                  :value="((this.remainingXp * 100) / this.totalXp)"
                  ></v-progress-linear>
                </v-flex>
              </v-flex>
            </transition>
              <v-flex py-5 class="agent-sprite">
                <div class="sprite-container" :class="{ shake: spriteShake }">
                  <img :src="this.spriteUrl" :class="[componentType === 'player' ? 'back-sprite' : 'front-sprite', { loaded: spriteLoaded }]">
                </div>
                <div class="ground-container" :class="componentType === 'player' ? 'back' : 'front'">
                  <img :src="this.ground">
                </div>
              </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ICountUp from 'vue-countup-v2'

import DispatchIcn from '@/assets/icons/poke_ball.png'

import GrassFront from '@/assets/battlebg/grass-front.png'

export default {
  name: 'Character',
  components: {
    ICountUp
  },
  props: {
    componentType: String,
    agentIndex: Number,
    remainingHp: Number,
    totalHp: Number,
    remainingXp: Number,
    totalXp: Number,
    agentNb: Number,
    agentKo: Number,
    agentSurname: String,
    agentLevel: Number
  },
  data () {
    return {
      spriteLoaded: false,
      spriteShake: false,
      spriteUrl: null,
      ground: GrassFront,
      currentColor: 'green',
      dispatchIcn: DispatchIcn,
      agentName: false,
      totalCountUpOptions: {
        startVal: this.totalHp,
        useEasing: true,
        useGrouping: false
      },
      remainingCountUpOptions: {
        startVal: this.remainingHp,
        useEasing: true,
        useGrouping: false
      }
    }
  },
  created () {
  },
  mounted () {
    const agentId = this.componentType === 'player' ? (JSON.parse(localStorage.playerAgentsList))[this.agentIndex].agent.id : (JSON.parse(localStorage.opponentAgentsList))[this.agentIndex].agent.id
    this.getCurrentColor(this.remainingHp, this.totalHp)
    this.getName(agentId)
    this.getSprite(agentId)
  },
  watch: {
    remainingHp (newVal, oldVal) {
      this.getCurrentColor(newVal, this.totalHp)
      this.shakeSprite(newVal, oldVal)
      this.remainingCountUpUpdate(newVal)
    },
    totalHp (newVal, oldVal) {
      this.getCurrentColor(this.remainingHp, newVal)
      this.totalCountUpUpdate(newVal)
    },
    agentIndex (newVal) {
      const agentId = this.componentType === 'player' ? (JSON.parse(localStorage.playerAgentsList))[newVal].agent.id : (JSON.parse(localStorage.opponentAgentsList))[newVal].agent.id
      this.getName(agentId)
      this.getSprite(agentId)
    }
  },
  methods: {
    getName (agentId) {
      if (!(this.agentSurname === '' || this.agentSurname === undefined)) {
        this.agentName = this.agentSurname
        return
      }
      var agentApiUrl = 'https://pokeapi.co/api/v2/agent-species/' + agentId
      this.$http.get(agentApiUrl)
        .then(async res => {
          this.agentName = res.data.names.filter(value => value.language.name.includes('fr'))[0].name
        })
    },
    getSprite (agentId) {
      this.spriteLoaded = false
      var isBack = this.componentType === 'player' ? 'back/' : ''
      var img = new Image()
      var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/agent/' + isBack + agentId + '.png'
      img.src = url
      img.onload = setTimeout(function () {
        this.spriteUrl = url
        setTimeout(function () {
          this.spriteLoaded = true
        }.bind(this), 500)
      }.bind(this), 500)
    },
    shakeSprite (newVal, oldVal) {
      if (newVal > oldVal) {
        return
      }
      this.spriteShake = true
      setTimeout(function () {
        this.spriteShake = false
      }.bind(this), 1000)
    },
    getCurrentColor (remaining, total) {
      if (((remaining * 100) / total) >= 50) {
        this.currentColor = 'green'
      } else if (((remaining * 100) / total) >= 25) {
        this.currentColor = 'yellow darken-2'
      } else if (((remaining * 100) / total) < 25) {
        this.currentColor = 'red'
      }
    },
    remainingCountUpUpdate (newVal) {
      this.remainingCountUpOptions.startVal = newVal
    },
    totalCountUpUpdate (newVal) {
      this.totalCountUpOptions.startVal = newVal
    }
  }
}
</script>

<style lang="scss">

.agent-infos {
  position: relative;
  > div:nth-child(1) {
    background-color: #FFF;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .dispatch-list {
    max-height: 24px;
    > span {
      opacity: 1;
      display: inline-block;
      position: relative;
      height: 16px;
      width: 16px;
      padding: 2px;
      background-repeat: no-repeat;
      background-size: contain;
      &:after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        background: #FFF;
        border-radius: 10px;
        transform: scale(0.7);
        opacity: 0;
      }
      &.ko {
        filter: saturate(0);
        &:after {
          opacity: 0.5;
          background: #000;
          transform: scale(0.8);
        }
      }
      &.disabled {
        opacity: 0.5;
        &:after {
          opacity: 1;
        }
      }
    }
  }
  .agent-name {
    min-height: 32px;
    .level {
      float: right;
      font-weight: bold;
    }
  }
  .life-bar {
    margin-left: auto;
    .v-progress-linear {
      margin: 0.5rem 0rem;
      transition:  2s cubic-bezier(.4,0,.6,1);
      .v-progress-linear__stream {
        animation-duration: 0.50s;
      }
      .v-progress-linear__determinate {
        z-index: 2;
        position: absolute;
      }
      &::before, &::after {
        content: "";
        height: 100%;
        width: 20px;
        position: absolute;
        z-index: 1;
      }
      &::before {
        left: 0px;
        background: linear-gradient(to right, rgb(255, 255, 255) 30%, transparent 100%);
      }
      &::after {
        right: 0px;
        background: linear-gradient(to left, rgb(255, 255, 255) 30%, transparent 100%);
      }
    }
  }
  .xp-bar {
    position: absolute;
    bottom: -6px;
    left: 0px;
    width: 100%;
    z-index: -1;
    [role='progressbar']  {
      margin: 0px;
      border-bottom-right-radius: 15px;
      .v-progress-linear__bar, .v-progress-linear__bar__determinate {
        transition: 2s cubic-bezier(.4,0,.6,1);
      }
    }
  }
}

.agent-sprite {
  text-align: center;
  z-index: 0;
  position: relative;
  min-height: 180px;
  pointer-events: none;
  .sprite-container {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      image-rendering: optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
      object-fit: contain;
      object-position: center bottom;
      height: 100%;
      width: 100%;
      transition: all 0.5s cubic-bezier(.4,0,.6,1), opacity 0.1s linear 0.2s;
      &.back-sprite {
        opacity: 0;
        transform: scale(0.5) translateY(100px) translateX(-100px);
        filter: contrast(0) brightness(100);
        &.loaded {
          opacity: 1;
          transform: scale(2.5) translateY(10px) translateX(-15px);
          filter: contrast(1) brightness(1);
        }
      }
      &.front-sprite {
        opacity: 0;
        transform: scale(0.1) translateX(200px) translateY(-50px);
        filter: contrast(0) brightness(100);
        &.loaded {
          opacity: 1;
          transform: scale(1.8) translateX(0px) translateY(5px);
          filter: contrast(1) brightness(1);
        }
      }
    }
    &.shake {
      animation-name: shaking;
      animation-duration: 1s;
      animation-timing-function: linear;
      iteration-count: cubic-bezier(.4,0,.6,1);
    }
  }
  .ground-container {
    z-index: 0;
    position: absolute;
    bottom: -5vw;
    width: 100%;
    height: 300px;
    img {
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      image-rendering: optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
      object-fit: contain;
      object-position: center bottom;
      height: 100%;
      width: 60%;
      max-width: 560px;
    }
    &.front {
      bottom: -50%;
      height: 150px;
    }
  }
}

.row-reverse {
  display: flex;
  flex-direction: row-reverse;
}

.slide-fade-enter-active {
  opacity: 1;
  transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes shaking {
  0% { transform: translate(2px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(0px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(2px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(2px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

</style>
