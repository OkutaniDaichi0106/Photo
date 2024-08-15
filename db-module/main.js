
import { createClient } from "@supabase/supabase-js";

// Constant to identifies the DB server
const PROJECT_URL = "https://khbecgwvsbdguigjapru.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmVjZ3d2c2JkZ3VpZ2phcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjY4MzYsImV4cCI6MjAzOTEwMjgzNn0.X8PCdQimHNp0hZoGVorEC1-W5HiYxXK2QtvWi99Jycw"

// All tables
const ROOMS_TABLE = "rooms"
const POSTS_TABLE = "posts"
const STARS_TABLE = "stars"

// Create client querys to the DB server
let client = createClient(PROJECT_URL, API_KEY)

// Sign in with Discord
async function signInWithDiscord() {
	const { data, err } = await client.auth.signInWithOAuth({
		provider: "discord",
		options: {
			redirectTo: "https://localhost:3000"
		}
	})
	if (err) {
		console.error(err)
	}

	const redirectURL = data.url
	// Redirect to the URL with some parameters
	window.location.href(redirectURL)

	/**
	 * At the redirect page, parse the paramters in the URL such as ... 
	 * access_token, expires_at, expires_in, provider_refresh_token, provider_token, refresh_token, token_type
	 */
}

// Sign out
async function signOut() {
	const { err } = await client.auth.signOut()
	if (err) {
		console.error(err)
	}
}

async function retrieveSession(){
	const { data, err } = await client.auth.getSession()
	if (err) {
		console.error(err)
	}
	return data
}

async function registerRoom(roomName, roomDescription) {
	// Get the client's User UID
const user = (await client.auth.getUser())
	const { data, err } = client.from(ROOMS_TABLE).insert({

	})
}

// Set a session with access_token and refresh_token
async function setSession(access_token, refresh_token) {
	const { data, err } = await client.auth.setSession({
		access_token: access_token,
		refresh_token: refresh_token,
	})

	if (err) {
		console.error(err)
	}
	return data
}

async function getUUIDFromTokens(access_token, refresh_token) {
	const data = await setSession(access_token, refresh_token)
	uuid = data.user.id
	return uuid
}

/////////////////////////

// On click button ""
await signInWithDiscord()

