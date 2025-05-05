import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const headersList = headers();
    const token = headersList.get('Authorization')?.split(' ')[1];
    
    // Check if token exists
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }
    
    // In a real app, you would validate the JWT token here
    // For demo, we just check if it starts with "mock-jwt-token"
    if (!token.startsWith('mock-jwt-token')) {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }
    
    // Process the user data
    const body = await request.json();
    const { name, email, role } = body;

    // Validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Here you would typically add user to database
    console.log("User added:", { name, email, role });
    
    return NextResponse.json(
      { 
        message: "User added successfully",
        user: { name, email, role, id: Date.now() }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add user error:", error);
    return NextResponse.json(
      { message: "Failed to add user" },
      { status: 500 }
    );
  }
} 