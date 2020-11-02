const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const { query } = require('./pool')
const { sign, verify } = require('jsonwebtoken')

const JWT_SECRET = 'secretKey!..'

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static('static'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/api/users').get(async (req, res) => {

	try {

		verify(req.headers.access_token, JWT_SECRET)
		
		const users = await query(
			`select
				id,
				username,
				first_name,
				last_name,
				created_at
				from users
			where deleted_at is null
			`
		)

		res.json({
			error: null,
			data: users
		})
	}
	catch(error) {

		res.json({
			error: true,
			message: error.message,
			data: null
		})
	}

})

app.route('/users').get(async (req, res) => {
	res.render('users')
})

app.route('/')
.get((req, res) => {
	res.render('main')
})
.post( async(req, res) =>{

	const { username, old_password } = await req.body
	
	try {
    const [user] = await query(
      `
				select username from users
				where username = $1
			`,
      username
		)

    if (user) {
			let [updatedUser] = await query(
				`
					UPDATE users SET password = crypt( $1, gen_salt('bf')) WHERE username = $2 returning *
				`,
				old_password, 
				username
			)
			console.log(updatedUser)
			res.json({
				message: 'ok',
				error: null,
				status: 200,
				data: { username: updatedUser.username, firstName: updatedUser.first_name, lastName: updatedUser.last_name},
				accessToken: sign(updatedUser, JWT_SECRET, {
					expiresIn: 60 * 60 * 24
				}),
			})
    } else {
      throw new Error("Wrong username || password");
    }
  } catch (error) {
    res.json({ message: error.message, error: true, status: 403, data: null });
  }
})

app.route('/login')
.get((req, res) => {
	res.render('login')
})
.post(async (req, res) => {
	
	try {

		const [user] = await query(
			`
				select id, username, first_name, last_name from users
				where username = $1 and password = crypt($2, password) and deleted_at is null
			`,

			req.body.username,
			req.body.password,
		)

		if (user) {

			res.json({
				message: 'ok',
				error: null,
				status: 200,
				data: { username: user.username, firstName: user.first_name, lastName: user.last_name},
				accessToken: sign(user, JWT_SECRET, { expiresIn: 60 * 60 * 24 }),
			})
		}
		else {

			throw new Error('Wrong username || password')
		}

	}
	catch(error) {

		res.json({ message: error.message, error: true, status: 403, data: null })
	}
})

app.route('/signup')
.get((req, res) => {
	res.render('signup')
})
.post(async (req, res) => {

	try {

		const [user] = await query(
			`
				insert into users (
					username, password, first_name, last_name
				)

				values ($1, crypt($2, gen_salt('bf')), $3, $4)

				returning id, username, first_name, last_name
			`,

			req.body.username,
			req.body.password,
			req.body.firstName,
			req.body.lastName,
		)

		res.json({
			message: 'created',
			error: null,
			status: 201,
			data: { username: user.username, firstName: user.first_name, lastName: user.last_name},
			accessToken: sign(user, JWT_SECRET, { expiresIn: 60 * 60 * 24 }),
		})
	}
	catch(error) {

		res.json({ message: error.message, error: true, status: 403, data: null })
	}
})

app.listen(
	PORT,
	() => console.info(`Server ready at http://localhost:${PORT}`)
)
