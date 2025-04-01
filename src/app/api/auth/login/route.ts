import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Read credentials from environment variables
const VALID_CREDENTIALS = {
  email: process.env.AUTH_EMAIL,
  password: process.env.AUTH_PASSWORD,
};

export async function POST(request: Request) {
  try {
    // Check if environment variables are set
    if (!VALID_CREDENTIALS.email || !VALID_CREDENTIALS.password) {
      return NextResponse.json(
        { error: "Authentication configuration is incomplete" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      // Set a session cookie
      cookies().set("session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
