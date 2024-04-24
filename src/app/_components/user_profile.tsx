import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function UserProfile() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}