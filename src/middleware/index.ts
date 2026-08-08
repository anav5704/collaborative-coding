import { defineMiddleware } from "astro:middleware"
import { getSession } from "auth-astro/server"

export const onRequest = defineMiddleware(async (context, next) => {
    const session = await getSession(context.request)

    if (session?.user) {
        context.locals.user = session.user as {
            email: string
            name: string
            image?: string
        }
    }

    const protectedPaths = [
        '/lessons/solo',
        '/lessons/team',
        '/lessons/pro',
        '/lessons/bonus',
    ]
    const isProtected = protectedPaths.some(path => context.url.pathname.startsWith(path))

    if (isProtected && !session?.user) {
        return new Response(null, {
            status: 302,
            headers: { Location: '/403' }
        })
    }

    return next()
})
