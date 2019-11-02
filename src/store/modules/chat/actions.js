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
	addToFeatured({},uid) {
		var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
		userRef.get().then((doc) => {
			doc.data().connections.forEach((item,index) => {
				if(item.uid == uid)
				{
					doc.data().connections[index].featured= true;
				}
			});
			// console.log(user[0])
			// var index = doc.data().connections.indexOf(user[0])
			// console.log(index)
			// doc.data().connections[indexOf(user[0])].update({
			// 	featured: true,
			// 	message: doc.data()
			// })
		})
	}
}
