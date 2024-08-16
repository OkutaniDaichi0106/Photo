import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Constant to identifies the DB server
export const PROJECT_URL = "https://khbecgwvsbdguigjapru.supabase.co"
export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmVjZ3d2c2JkZ3VpZ2phcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjY4MzYsImV4cCI6MjAzOTEwMjgzNn0.X8PCdQimHNp0hZoGVorEC1-W5HiYxXK2QtvWi99Jycw"

// All tables
export const ROOMS_TABLE = "rooms"
export const POSTS_TABLE = "posts"
export const STARS_TABLE = "stars"
export const IMG_STORAGE = "photos"

// Create client querys to the DB server
const client = createClient(PROJECT_URL, API_KEY)

// Sign in with Discord
export async function SignInWithDiscord() {
	const { data, err } = await client.auth.signInWithOAuth({
		provider: "discord",
	})
	if (err) {
		console.error(err)
	}

	const redirectURL = data.url
	// Redirect to the URL with some parameters
	console.log(redirectURL)

	//window.location.href(redirectURL)

	/**
	 * At the redirect page, parse the paramters in the URL such as ... 
	 * access_token, expires_at, expires_in, provider_refresh_token, provider_token, refresh_token, token_type
	 */
}

// Sign out
async function SignOut() {
	const { err } = await client.auth.signOut()
	if (err) {
		console.error(err)
	}
}

export async function Post(image, text, roomID, userID) {
	const { data, error } = await client.storage.from(IMG_STORAGE).upload(`CraftStadium/${text}`, image)
	if (error) {
		console.error(error)
	}
	console.log(data)
	const postID = data.id

	const data1 = client.storage.from(IMG_STORAGE).getPublicUrl(data.fullPath)
	if (data1) {
		const { error01 } = await client.from(POSTS_TABLE).insert({
			"photo_url": data1.data.publicUrl,
			"post_id": postID,
			"room_id": roomID,
			"stars": 0,
			"user_id": userID,
		})
		if (error01) {
			console.error(error)
		}
	} else {
		console.error("failed to upload")
	}	
}

export async function Load(roomID) {
	const {data, error} = await client.from(POSTS_TABLE).select("*").eq("room_id", roomID)
	if (error) {
		console.error(error)
	}
	return data
}

async function RegisterRoom(roomName, roomDescription) {
	// Get the client's User UID

	const data = await client.auth.getUser()
	console.log(data)
	const { data1, err } = client.from(ROOMS_TABLE).insert({

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

async function Evaluate(post_id, star) {
	// Check if the number of the stars is valid
	if (star < 0 || star > 3) {
		console.error("invalid star")
		return
	}

	// Register the data
	const { data, err } = await client
		.from(STARS_TABLE)
		.insert({
			"post_id": post_id,
			"star": star,
		}).select()

	if (err) {
		console.error(err)
	}
	console.log(data)
}

// 
async function GetTotal(post_id) {
	const { stars, err } = await client.from(STARS_TABLE).select("star").eq("post_id", post_id)
	if (err) {
		console.error(err)
	}
	let sum = 0
	for (let i = 0; i < stars.length; i++) {
		sum += stars[i]
	}
	return sum
}

async function GetPosts(room_id) {
	const { data, err } = client.from(POSTS_TABLE).select("*").eq("room_id", room_id)
	if (err) {
		console.error(err)
	}
	console.log(data)
}

async function SignUp() {
	const { data, err } = await client.auth.signUp({
		email: "daichi1616.kytuniv@gmail.com",
		password: "rikugame3",
	})
}



/////////////////////////

// SAMPLE

/**
 * Sign In
 * 
 * async function () {
 *   await signInWithDiscord()
 * }
 * 
 */
