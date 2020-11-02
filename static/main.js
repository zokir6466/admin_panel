;(async () => {
	const userStorage = window.localStorage.getItem('user') || '{}'

	const user = JSON.parse(userStorage)

	if (!user.username) {

		window.location.pathname = '/login'
	}

	const userRef = document.getElementById('userRef')
	const logoutBtn = document.getElementById('logoutBtn')
	const changerBtn = document.getElementById('changerBtn')
	const changerForm = document.getElementById('passChangerForm')


	userRef.textContent = user.firstName + ' ' + user.lastName

	logoutBtn.onclick = () => {

		window.localStorage.removeItem('user')
		window.localStorage.removeItem('access_token')
		window.location.pathname = '/login'
	}

	changerBtn.onclick = ()=>{
		changerForm.classList.remove('passChangerNone')
	}

})()
