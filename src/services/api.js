const API_URL = "https://dummyjson.com/c/375b-c28f-491d-a33a"

export async function fetchResources() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch cloud resources")
  }

  const data = await response.json()

  return data.resources
}