'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: "Dixit",
        price: "400000",
        CategoryId: 1,
        stock: 2,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/8WnWnWR-u58DCbhxEwcmtsk5UJQ=/fit-in/1200x900/filters:no_upscale()/pic3483909.jpg",
        detail: `One player is the storyteller for the turn and looks at the images on the 6 cards in her hand. From one of these, she makes up a sentence and says it out loud (without showing the card to the other players).

        Each other player selects the card in their hands which best matches the sentence and gives the selected card to the storyteller, without showing it to the others.
        
        The storyteller shuffles her card with all the received cards. All pictures are shown face up and every player has to bet upon which picture was the storyteller's.
        
        If nobody or everybody finds the correct card, the storyteller scores 0, and each of the other players scores 2. Otherwise the storyteller and whoever found the correct answer score 3. Players score 1 point for every vote for their own card.
        
        The game ends when the deck is empty or if a player scores 30 points. In either case, the player with the most points wins the game.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Pandemic Legacy",
        price: "1000000",
        CategoryId: 3,
        stock: 2,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/sDqvhEpE9TCCWqDJSbOszGTHoDk=/fit-in/1200x900/filters:no_upscale()/pic2452831.png",
        detail: `In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.

        The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases' activity. A second, separate deck of cards controls the "normal" spread of the infections.
        
        Taking a unique role within the team, players must plan their strategy to mesh with their specialists' strengths in order to conquer the diseases. For example, the Operations Expert can build research stations which are needed to find cures for the diseases and which allow for greater mobility between cities; the Scientist needs only four cards of a particular disease to cure it instead of the normal five—but the diseases are spreading quickly and time is running out. If one or more diseases spreads beyond recovery or if too much time elapses, the players all lose. If they cure the four diseases, they all win!`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Avalon",
        price: "540000",
        CategoryId: 2,
        stock: 4,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/lNnq8X4bF9cdFxyW2bTCPMg9zC4=/fit-in/1200x900/filters:no_upscale()/pic1398895.jpg",
        detail: `The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few in number but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Monopoly City",
        price: "300000",
        CategoryId: 2,
        stock: 1,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/HTvkQwpf6nqqJahLmJxSMfb7kLs=/fit-in/1200x900/filters:no_upscale()/pic486673.jpg",
        detail: `At first you think you are playing good old Monopoly where they just add some extra buildings to give a little twist. But the longer you play, the more you realise they actually made a whole new game. You start with more money than usual, which gives you the idea you will last longer (with a bit of luck maybe). The fact that now you can build right away when you bought a property, gives so much dynamic to the game. No more waiting until you have the whole set, or not having the set because one player refuses to trade. Even with a couple of single properties you can win the game.
        But not so fast. Everybody wants to win of course. And with the 80 extra buildings they added to the game, nothing was ever so uncertain. On every property you can build residential or industrial buildings. The first is not protected against negative buildings (hazards) and requires positive buildings otherwise the property becomes worthless. The industrial buildings on the other hand are protected but they cost twice as much! So you will have to make choice. And the added electronic device will, besides timing deals, always indicate how many buildings you can exactly make.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Code Name",
        price: "300000",
        CategoryId: 1,
        stock: 3,
        image_url: "https://cf.geekdo-images.com/imagepage/img/BwJJTrofiaH0Muxuo5rv0VCmuCY=/fit-in/900x600/filters:no_upscale()/pic2582929.jpg",
        detail: `Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES.

        In Codenames, two teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "The Resistance",
        price: "500000",
        CategoryId: 2,
        stock: 1,
        image_url: "https://cf.geekdo-images.com/imagepage/img/s5SyMXpHKpG_C-Lentt3BT7dkT8=/fit-in/900x600/filters:no_upscale()/pic2576459.jpg",
        detail: `The Empire must fall. Our mission must succeed. By destroying their key bases, we will shatter Imperial strength and liberate our people. Yet spies have infiltrated our ranks, ready for sabotage. We must unmask them. In five nights we reshape destiny or die trying. We are the Resistance!

        The Resistance is a party game of social deduction. It is designed for five to ten players, lasts about 30 minutes, and has no player elimination. The Resistance is inspired by Mafia/Werewolf, yet it is unique in its core mechanics, which increase the resources for informed decisions, intensify player interaction, and eliminate player elimination.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Wingspan",
        price: "1500000",
        CategoryId: 2,
        stock: 2,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/L-jJA_Yzxw3r5ZrCmqdGEWtubvI=/fit-in/1200x900/filters:no_upscale()/pic4458123.jpg",
        detail: `Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games.

        You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats (actions). These habitats focus on several key aspects of growth:
        
        Gain food tokens via custom dice in a birdfeeder dice tower
        Lay eggs using egg miniatures in a variety of colors
        Draw from hundreds of unique bird cards and play them
        The winner is the player with the most points after 4 rounds.
        
        If you enjoy Terraforming Mars and Gizmos, we think this game will take flight at your table.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
