;(async () => {
	const userStorage = window.localStorage.getItem('user') || '{}'

	const user = JSON.parse(userStorage)

	if (user.username) {

		window.location.pathname = '/'
	}

	const form = document.getElementById('form')
	const messageRef = document.getElementById('message')

	const usernameRef = document.getElementById('username')
	const passwordRef = document.getElementById('password')
	
	const firstNameRef = document.getElementById('first_name')
	const lastNameRef = document.getElementById('last_name')

	form.onsubmit = async e => {

		e.preventDefault()

		try {
			const fetchResponse = await fetch('http://localhost:4000/signup', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: usernameRef.value,
					password: passwordRef.value,
					firstName: firstNameRef.value,
					lastName: lastNameRef.value,
				})
			})

			const response = await fetchResponse.json()

			messageRef.textContent = response.message

			if (!response.error) {

				console.log(response.data)

				window.localStorage.setItem('access_token', response.accessToken)
				window.localStorage.setItem('user', JSON.stringify(response.data))

				setTimeout(() => {

					window.location.pathname = '/'

				}, 2500)
			}
		}
		catch(error) {
			console.log(error)
		}
		finally {
			e.target.reset()
		}
	}
})()
