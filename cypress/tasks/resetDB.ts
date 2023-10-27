import { AuthenticationChallengeRepository } from "@/model/AuthenticationChallenge";
import { AuthenticatorRepository } from "@/model/Authenticator";
import { client } from "@/model/CassandraClient";
import { StateRepository } from "@/model/State";
import { TaskRepository } from "@/model/Task";
import { UserRepository } from "@/model/User";

const repositories = [
  new AuthenticatorRepository(),
  new AuthenticationChallengeRepository(),
  new StateRepository(),
  new TaskRepository(),
  new UserRepository(),
];

export default async function resetDB() {
  await client.connect();

  const promises = repositories.map(async (repository) => {
    await client.execute(`TRUNCATE TABLE ${repository.tableName}`);
  });
  await Promise.all(promises);

  await client.shutdown();
}