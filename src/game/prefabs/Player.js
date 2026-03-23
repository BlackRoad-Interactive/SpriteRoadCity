import MovableCharacter from './MovableCharacter'
import appBus from '../../shared/app-bus'
import store from '@/store'

export default class Player extends MovableCharacter {
  constructor (scene, x, y) {
    super(scene, x, y, 'player')
  }

  update (args) {
    // console.log(this.x, this.y)
    this.scene.cameras.main.startFollow(this)
    super.update(args)
  }

  handleAction () {
    let nextTile = this.getNextTile()
    if (nextTile.isOccupied) {
      console.log('Start dialog')
      appBus.$emit('dialog:open', {
        strings: [
          'Bien le bonjour ! Bienvenue dans le monde incroyable des Agent !',
          'Mon nom est Chen ! Les gens m\'appellent amicalement le Prof. Agent !',
          'Pour certains, les Agent sont des animaux domestiques, pour d\'autres, ils sont un moyen de combattre.',
          'Des Agent sauvages infestent les hautes herbes ! Il te faut un Agent pour te protéger... Tiens ! Prends ça !',
          '<em>Reçu</em> - <strong>3 Agent</strong>, <strong>3 Pokéballs</strong>, <strong>2 Superballs</strong>'
        ],
        action: () => {
          this.receiveItems({
            agentList: [
              { name: 'Bulbizarre' },
              { name: 'Carapuce' },
              { name: 'Salamèche' }
            ],
            credits: [
              { type: 'Pokéball', quantity: 3 },
              { type: 'Superball', quantity: 2 }
            ]
          })
        }
      })

      if (this.faces === 'up') {
        nextTile.isOccupiedBy.moveTo('down')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'right') {
        nextTile.isOccupiedBy.moveTo('left')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'down') {
        nextTile.isOccupiedBy.moveTo('up')
        nextTile.isOccupiedBy.stopMoving()
      } else if (this.faces === 'left') {
        nextTile.isOccupiedBy.moveTo('right')
        nextTile.isOccupiedBy.stopMoving()
      }
    }
  }

  receiveItems (payload) {
    console.log('Received items!', payload)

    store.commit('player/updateState', payload)
  }
}
