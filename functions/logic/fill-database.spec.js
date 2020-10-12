const { expect } = require('chai')
const { fillDatabase } = require('./')
const admin = require('firebase-admin')
const URL = 'https://jsonplaceholder.typicode.com/posts'

describe('fillDatabase', () => {
    before( async () => {
        admin.initializeApp({ credential: admin.credential.applicationDefault() })

        // Clear list from Firestore
        const list = await admin.firestore().collection('list').get()
        const batch = admin.firestore().batch()
        list.forEach(document => batch.delete(document.ref))
        await batch.commit()
    })

    it('Should fill the list collection with 100 docs', async () => {
        await fillDatabase(URL)

        const snapshot = await admin.firestore().collection('list').get()

        expect(snapshot._size).to.equal(100)
    })

    it('Should only fill the list collection in the case it is empty', async () => {
        await fillDatabase(URL)
        await fillDatabase(URL)

        const snapshot = await admin.firestore().collection('list').get()

        expect(snapshot._size).to.equal(100)
    })

    after(async () => {
        // Clear list from Firestore
        const list = await admin.firestore().collection('list').get()
        const batch = admin.firestore().batch()
        list.forEach(document => batch.delete(document.ref))
        await batch.commit()

        admin.app().delete()
    })

})