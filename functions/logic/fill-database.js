const admin = require('firebase-admin')
const axios = require('axios')

module.exports = async (url) => {
    const response = await axios.get(url)

    list = [ ]
    const snapshot = await admin.firestore().collection('list').get()

    if(!snapshot._size) {
        const db = admin.firestore()
        const batch = db.batch()

        response.data.forEach(element => {
            const docRef = db.collection('list').doc()
            batch.set(docRef, element)
        })

        await batch.commit()

        return response.data.length
    } else {
        return 0
    }
}