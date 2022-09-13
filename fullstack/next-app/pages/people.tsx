import {User} from "../models";
import {prisma} from "../prisma";

export default function People({people}: { people: User[] }) {
  return (
    <>
      {people.map((user) => (
        <div>{user.name}</div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const people = await prisma.user.findMany()

  return {
    props: {
      people
    },
  };
}
