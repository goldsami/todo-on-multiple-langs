import {User} from "../models";
import {prisma} from "../prisma";
import Layout from "../components/layout";
import PersonCard from "../components/personCard";

export default function People({people}: { people: User[] }) {
  return (
    <Layout>
      {people.map((user, i) => (
        <div key={i}>
          <PersonCard person={user}/>
        </div>
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
