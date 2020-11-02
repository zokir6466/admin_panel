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

	form.onsubmit = async e => {

		e.preventDefault()

		try {

			const fetchResponse = await fetch('http://localhost:4000/login', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: usernameRef.value,
					password: passwordRef.value,
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

				}, 2000)
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
