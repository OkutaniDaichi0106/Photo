import { createClient, SupabaseClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://khbecgwvsbdguigjapru.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmVjZ3d2c2JkZ3VpZ2phcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjY4MzYsImV4cCI6MjAzOTEwMjgzNn0.X8PCdQimHNp0hZoGVorEC1-W5HiYxXK2QtvWi99Jycw"

const USERS_TABLE = "users"
const ROOMS_TABLE = "rooms"
const POSTS_TABLE = "posts"
const supabaseClient = createClient(PROJECT_URL,API_KEY);

//Show all rooms
async function getRooms() {
	// Get recent 100 rooms
	let { data, err } = await supabaseClient
		.from(ROOMS_TABLE)
		.select("id, created_at, established_by, name, description")
		.order("created_at", {ascending: false})
		.limit(100)
	if (err) {
		console.error(err);
	}
	return data
}


//
async function getUserData() {
	
}

supabaseClient.from(USERS_TABLE).select("").eq()