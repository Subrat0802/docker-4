import {prisma} from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await prisma.user.findMany();
  return (
    <div>
      {JSON.stringify(response)}
    </div>
  );
}


// export const revalidate = 60 //revalidate every 60 seconds