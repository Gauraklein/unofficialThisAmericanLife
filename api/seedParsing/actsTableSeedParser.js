const allEpisodeData = require("./allEpisodeData")
const newestEpisode = require("../newestEpisode")

// console.log(allEpisodeData.allEpisodeData[0])

let actSeedData = []
let producerSeedData = []

// allEpisodeData.allEpisodeData.map(extractActData)

// console.log(newestEpisode)

extractActData(newestEpisode.newestEpisode)

// console.dir(producerSeedData, {depth: null, maxArrayLength: null})
console.dir(actSeedData, {depth: null, maxArrayLength: null})


function extractActData (individualEpisode) {

    for (let actNumber = 0; actNumber < individualEpisode.acts.length; actNumber++) {

        let individualActObject = {
            episode_number: individualEpisode.number,
            episode_title: individualEpisode.title,
            act_number: individualEpisode.number + "." + actNumber,
            act_title: individualEpisode.acts[actNumber].title,
            producers: individualEpisode.acts[actNumber].producers.toString(),
            act_description: individualEpisode.acts[actNumber].description,
            act_song: individualEpisode.acts[actNumber].song
        }

        actSeedData.push(individualActObject)

        for (let producerNumber = 0; producerNumber < individualEpisode.acts[actNumber].producers.length; producerNumber++) {

            let individualProducerObject = {
                episode_number: individualEpisode.number,
                episode_title: individualEpisode.title,
                act_number: individualEpisode.number + "." + actNumber,
                act_title: individualEpisode.acts[actNumber].title,
                producer: individualEpisode.acts[actNumber].producers[producerNumber]
            }
    
            producerSeedData.push(individualProducerObject)

        }
    }
}



module.exports = {
    actSeedData: actSeedData,
    producerSeedData: producerSeedData
  };