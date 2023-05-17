import { useState, useEffect } from "react";
import styles from "../styles/login.module.scss";
import axios from "axios";
import TextField from "shared/InputFields/TextField";
import { Hide, Show } from "features/svgIcons/showHide";
import Logo from "features/svgIcons/logoBlack";
import Button from "shared/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Google from "features/svgIcons/Google";

export default function LogInPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const handleBack = () =>{
    router.back()
  }

  if (typeof window !== undefined) {
    return (
      <div>
        <div className={styles.loginPageWrapper}>
          <div className={styles.contentContainer}>
            <div className={styles.containerHeader}>
              <Logo />
            </div>
            <>
              <div className={styles.heading}> Welcome</div>
              <div className={styles.subTitle}>Log in with your Sondeka Account to continue</div>
              {Object.values(providers).map((provider) => (
                <div key={provider.name} className={styles.buttonsContainer}>
                  <button onClick={() => signIn(provider.id)} className={styles.googleButton}>
                    <div  className={styles.googleIconWrapper}><Google/></div>
                    <div className={styles.googleButtonText}>Continue with {provider.name}</div>
                  </button>
                </div>
              ))}
            </>
            <div className={styles.footer}>
              <Link href={'/privacy'}><p>Privacy Policy</p> </Link>
              <p>|</p>
              <p onClick={handleBack}>Back</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <>Window not defined</>;
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
