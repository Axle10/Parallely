import firebase from 'firebase'

export default {
	getAllFriends({ commit }) {
		var ref = firebase.firestore().collection('users')
		var userRef = ref.doc(firebase.auth().currentUser.uid)
		var friends = new Array()
		userRef.get().then((doc) => {
			doc.data().connections.forEach(connection => {
				if(connection.message == true)
				{
					ref.doc(connection.uid).get().then((result) => {
						var name = result.data().name
						var photoURL = result.data().photoURL
						friends.push({...connection, name: name, photoURL: photoURL})
					})
				}
			});
		});
		commit('SET_FRIENDS',friends)
	},
	toggleFeatured({},uid) {
		var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
		userRef.get().then((doc) => {

			var updatedConnection = doc.data().connections.map( (connection) => {
				return {
					featured: connection.uid == uid ? !connection.featured : connection.featured,
					message: connection.message,
					uid: connection.uid
				}
			});

			userRef.update({
				bio: doc.data().bio,
				email: doc.data().email,
				photoURL: doc.data().photoURL,
				uid: doc.data().uid,
				connections: updatedConnection
			})
		})
	},
	checkFeatured({},uid) {
		var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
		var featured = false;
		return new Promise( resolve => {
			userRef.get().then((doc) => {
				doc.data().connections.forEach(connection => {
					if(connection.uid == uid)
					{
						featured = connection.featured
					}
				})
				console.log(featured)
				resolve(featured);
			});
		})
	},
	getAllFeaturedFriends({ commit }) {
		var ref = firebase.firestore().collection('users')
		var userRef = ref.doc(firebase.auth().currentUser.uid)
		var featuredFriends = new Array()
		userRef.get().then((doc) => {
			doc.data().connections.forEach(connection => {
				if(connection.featured == true)
				{
					ref.doc(connection.uid).get().then((result) => {
						var name = result.data().name
						var photoURL = result.data().photoURL
						featuredFriends.push({...connection, name: name, photoURL: photoURL})
					})
				}
			});
			commit('SET_FEATUREDFRIENDS',featuredFriends)
		});
	},
}
