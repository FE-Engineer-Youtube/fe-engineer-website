import type { MetaFunction } from "@remix-run/node";
import Splash from "~/components/organisms/splash";

export const meta: MetaFunction = () => {
  return [
    { title: "FE-Engineer" },
    {
      name: "description",
      content:
        "Welcome to the website for FE-Engineer on Youtube.  Learn to build software and hardware at home to use AI, automation, and web tools to improve your life!",
    },
  ];
};

export default function Index() {
  return (
    <div className="index">
      <Splash />
    </div>
  );
}
