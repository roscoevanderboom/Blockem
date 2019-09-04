// 
// 

export default {     
    getSingleDoc: (docRef) => {
        return new Promise((resolve, reject) => {
            docRef.get()
                .then(function (doc) {
                    resolve(doc.data());
                }).catch(function (error) {
                    reject("Error getting document:", error);
                });
        })
    },
    getCollection: (collection) => {
        return new Promise((resolve, reject) => {
            let data = [];
            collection.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        data.push(doc.data())
                    }
                    if (doc.data().ID === undefined) {
                        collection.doc(doc.id).update({ ID: doc.id, })
                    }
                });
                resolve(data);
            })
                .catch(function (error) {
                    reject("Error getting documents: ", error);
                });
        })

    },
    getSnapshot: (collection) => {
        let data = [];
        return new Promise((resolve, reject) => {
            collection.onSnapshot(function (doc) {
                doc.forEach(function (doc) {
                    if (doc.exists && doc.id.includes('Room')) {            
                      data.push(doc.data())
                      console.log(doc.data())
                      console.log(doc.id)
                    }
                  });
                resolve(data);
            })
                .catch(function (error) {
                    reject("Error getting documents: ", error);
                });
        });
    },
    // This create a new document with a random doc ID
    writeNewDoc: (collection, data) => {
        return new Promise((resolve, reject) => {
            collection.add(data)
                .then(function () {
                    resolve(true);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    // This updates data in a given document
    updateDoc: (doc, data) => {
        return new Promise((resolve, reject) => {
            doc.set(data)
                .then(function (val) {
                    console.log(val)
                    resolve(true);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },

    deleteDoc: (collection, docID) => {
        return new Promise((resolve, reject) => {
            collection.doc(docID).delete().then(function () {
                resolve(true);
            }).catch(function (error) {
                reject(error);
                alert(`You can't delete that content`);
            });
        });
    },
    deleteAll: (collection) => {
        collection.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    collection.doc(doc.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                       console.log("Error removing document: ", error);
                    });
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
}
