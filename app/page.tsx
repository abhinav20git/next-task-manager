
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";


export default async function Home() {
    const { userId } = await auth();

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  return (
    <div className="h-screen  flex flex-col items-center">

      
      <div className="mt-20 max-w-4xl text-center">
        <p className="mt-4 text-gray-600">
          Getting started with Task Manager is super easy!
        </p>
       
      </div>

      
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Boost Your Productivity?
        </h2>
        <p className="mt-2 text-gray-600">
          Sign up now and start organizing your tasks today!
        </p>
        <Link href="/task">
          <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600">
            Get Started
          </button>
        </Link>
        
        
      </div>

      <footer className="mt-20 py-6 text-gray-600 text-sm">
        © 2025 Task Manager ny Abhinav. All rights reserved.
      </footer>
    </div>
  );
}

// Reusable Components
