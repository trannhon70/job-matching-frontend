import bg from "@/assets/backgrounds/employee-bg.png";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "../_components";

const Register = () => {
  return (
    <div className="h-screen lg:p-10">
      <div className="container relative h-full flex-col items-center justify-center overflow-hidden border shadow-md md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Image src={bg} alt="bg" fill className="object-cover" />
        </div>
        <div className="flex h-full items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to JOB MATCHING
              </h1>
              <p className="text-xs text-muted-foreground">
                Unlocking Potential, Creating Excellence: Your Ideal Candidate
                for Tomorrow&apos;s Opportunities.
              </p>
              <Link
                className="text-center text-sm text-blue-600 underline"
                href="/employer-register"
              >
                Register employer account
              </Link>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
