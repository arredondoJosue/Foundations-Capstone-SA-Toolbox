const dimensionsDB = require('./dimensions-db.json')
const dbReset = require('./db-reset.json')

module.exports = {
    connect: ("/main", (req, res) => {
        let test = 'Server Connected with Front End'
        res.status(200).send(test)
    }),
    reset: ("/reset", (req, res) => {
        for(let i = 0; i < dbReset.length; i++){
            let standardSIDs = dbReset[[i]].SIDs
            dimensionsDB[i].SIDs = standardSIDs
        }

        res.status(200).send(dimensionsDB)
    }),
    generateClick: ('/formatsids', (req, res) => {
        let {formattedSids} = req.body
        console.log(formattedSids);
        res.status(200).send(formattedSids)
    }), 
    db: ('/getdb', (req, res) => {
        res.status(200).send(dimensionsDB)
    }),
    update: ('/update', (req, res) => {
        let {inputText, itteration} = req.body
        inputText = inputText.trim().replace(/["',]/g,'').replaceAll(' ',',')
        
        const update = {
            inputText: inputText.split(','),
            itteration
        }

        let dbSids = dimensionsDB[itteration].SIDs
        dbSids = update.inputText
        dimensionsDB[itteration].SIDs = dbSids

        res.status(200).send(update)
    })
}