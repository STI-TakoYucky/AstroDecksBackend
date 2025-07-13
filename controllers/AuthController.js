import { clerkClient, getAuth } from '@clerk/express'

export const authenticateUser = async (req, res) => {
      // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
}