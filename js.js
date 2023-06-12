const client = require("../clients/sdclient");
const { matchSelectionCriteria } = require('../prompts/prompts')

const ImagesController = {
  Index: async (req, res) => {
    try {
      const prompts = matchSelectionCriteria(req.body.sdChoices)    
      const result = await client.generateImage(prompts.positivePrompts, prompts.negativePrompts);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;

{
  "character": "Darth Vader",
  "genre": "Dystopian",
  "style": "Pixar",
  "prompt": "riding horses with stormtroopers",
  "messageHistory": [
    "Chapter 1: The Dark Horseman Darth Vader, the Dark Lord of the Sith, rode his black stallion through the scorching desert of Tatooine. The sun beat down on him as he led his unit of stormtroopers towards their next destination. They kept their eyes peeled for any signs of Rebel activity. Suddenly, a group of sand people emerged on the horizon. Vader reached for his lightsaber as he prepared for the inevitable attack.",
    "Chapter 2: The Abandoned Mine The group of Stormtroopers led Darth Vader to an abandoned mine on the outskirts of the town. The mine was rumored to be a hideout for bandits, but it was also said to hold secrets that the Empire needed. As they entered the mine, they noticed that there were signs of recent activity. Vader instructed the Stormtroopers to remain silent as they navigated deeper into the mine, weapons at the ready. Suddenly, they noticed a door that appeared to lead to an underground construction site.",
    "Chapter 3: The Confrontation The Stormtroopers followed Darth Vader into a dimly-lit construction site, discovering stolen Imperial equipment hidden there. Vader commanded his men to seize everything. Before leaving, Black Bart, the notorious outlaw, emerged from the shadows and attacked. Vader fought back with his lightsaber while the Stormtroopers fired. Ultimately, Vader emerged victorious, aware that more challengers awaited. As he prepared to depart, he spotted a nearby saloon. Satisfied with his mission, he decided to grab a beer there."
  ],
  "imageHistory": [
    "https://i.ibb.co/ZgmXX0z/e0db061a33d2.png",
    "https://i.ibb.co/F8pVbHJ/s2-db-const-01.png",
    "https://i.ibb.co/k3t844C/20383220cbce.png"
  ]
}
