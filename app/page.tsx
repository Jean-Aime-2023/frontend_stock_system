/* eslint-disable react/no-children-prop */

import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <AuthLayout children={<Login/>}/>
  );
}
