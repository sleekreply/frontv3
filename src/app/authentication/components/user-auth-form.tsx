
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth.service"
import { LoginRequest } from "@/types/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const form = event.target as HTMLFormElement
    const credentials: LoginRequest = {
      username: form.email.value,
      password: form.password.value,
    }

    try {
      await AuthService.login(credentials)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

