import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { signOutAction } from "@/actions/signout-action"

export async function AuthNav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <ul className="grid grid-flow-col w-fit gap-x-2">
      {!session ? (
        <>
          <li>
            <a className="text-sm text-orange-700" href="/signup">
              Sign Up
            </a>
          </li>
          <li>
            <a className="text-sm text-orange-700" href="/signin">
              Sign In
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <button
              type="button"
              className="text-sm text-orange-700 hover:underline cursor-pointer"
            >
              {session?.user ? session?.user?.name : ""}
            </button>
          </li>
          <li>
            <form action={signOutAction}>
              <button
                className="text-sm text-orange-700 hover:underline cursor-pointer"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </li>
        </>
      )}
    </ul>
  )
}
