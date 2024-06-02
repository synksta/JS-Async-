const sendButton = document.querySelector('#sendButton')

sendButton.addEventListener('click', postData)

wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function postData() {
	console.log('bebra')
	const usernameInput = document.querySelector('#usernameInput')
	const messageInput = document.querySelector('#messageInput')
	const username = (usernameInput.value = usernameInput.value.replace(
		/\s{2}(?=[\s\S]*\S)/g,
		''
	))
	const message = (messageInput.value = messageInput.value.replace(
		/\s{2}(?=[\s\S]*\S)/g,
		''
	))
	if (username === '' || message === '') {
		if (username === '') {
			usernameInput.classList.add('placeholder-stone-400')
			await wait(500)
			usernameInput.classList.remove('placeholder-stone-400')
		}
		if (message === '') {
			messageInput.classList.add('placeholder-stone-400')
			await wait(500)
			messageInput.classList.remove('placeholder-stone-400')
		}
		return
	}

	const randomCoordinate = (min = 10, max = 90) =>
		Math.floor(Math.random() * (max - min + 1)) + min

	const data = { username, message }
	data.timestamp = Date.now()
	data.x = randomCoordinate()
	data.y = randomCoordinate()

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}

	const res = await fetch('/api', options)

	const item = await res.json()

	console.log(item)

	document.body.append(thought(item))
}

async function getData() {
	const res = await fetch('/api')
	const data = await res.json()
	let inc = data.length
	for (item of data) {
		console.log(item)
		document.body.append(thought(item))
		await wait(inc--)
	}

	console.log(data)
}

const thought = (item) => {
	const thought = document.createElement('div')
	thought.classList = 'text-stone-400 font-bold absolute'
	thought.style.zIndex = 0
	thought.style.top = `${item.y}%`
	thought.style.left = `${item.x}%`
	thought.textContent = `${item.username}: ${item.message}`
	return thought
}

getData()
