import {User} from "../models";
import {prisma} from "../prisma";
import Layout from "../components/layout";

export default function People({people}: { people: User[] }) {
  return (
    <Layout>
      {people.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </Layout>
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
