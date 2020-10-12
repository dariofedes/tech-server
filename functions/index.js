const admin = require('firebase-admin')
admin.initializeApp()
const functions = require('firebase-functions')
const { fillDatabase } = require('./logic')

exports.fillDatabase = functions.https.onRequest(async (req, res) => {
        const documentsAdded = await fillDatabase(functions.config().filldatabase.url)

        res.json({result: `${documentsAdded} documents added to list collection`})
})