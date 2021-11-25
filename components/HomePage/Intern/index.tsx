import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchUser, { UserOnSteriods } from "../../../lib/helpers/fetchUser";
import { SupabaseUser } from "../../../lib/SupabaseUser";
import JobsList from "../../Jobs/JobsList";
import Navbar from "./Navbar";

type InternHomepageProps = { user: SupabaseUser };

const InternHomepage = (props: InternHomepageProps) => {
  const [userDb, setUserDb] = useState<UserOnSteriods | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (
      props.user &&
      props.user.email !== "" &&
      props.user.email !== undefined
    ) {
      // if the user(auth  user) exists, check for the user in db
      (async () => {
        const userDbRes = await fetchUser(props.user.email || "");
        setUserDb(userDbRes);
        if (!userDbRes || !userDbRes.email) {
          // if the user is not in db send them to the onboarding page(which will make a new user in db)
          router.push("/onboarding");
        }
      })();
    }
  }, [props.user, router, userDb]);

  return (
    <div>
      <Navbar />
      <div className="h-screen bg-gray-50">
        <div className="mx-auto py-10">
          <h1 className="text-4xl pb-2  m-auto text-center">Search For Jobs</h1>
        </div>
        <div>
          <JobsList userDb={userDb} />
        </div>
      </div>
    </div>
  );
};

export default InternHomepage;
