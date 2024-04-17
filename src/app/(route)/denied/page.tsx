import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Denied = () => {
  return (
    <div className="min-h-screen">
      <div className="container flex justify-center pt-20">
        <Card className="flex w-fit flex-col items-center justify-center gap-2 p-6">
          <h6 className="font-semibold">You do not have permission</h6>
          <Button asChild>
            <Link href="/">Go to homepage</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Denied;
