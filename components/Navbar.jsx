"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {


  const {data : session} = useSession()
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(null);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <h1 className="head_text red_gradient ">Ep</h1>
      </Link>
      {/* Desktop device */}
      <div className="sm:flex hidden ">
        {session?.user? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="Profile Image"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn "
                >
                  signIn
                </button>
              ))}
          </div>
        )}
      </div>
      {/* mobile device */}
      <div className="sm:hidden flex relative">
        {session?.user?(
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile Image"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              onClick={()=>setToggle((prev)=>!prev)} 

            />
            {toggle && (<div className="dropdown">
            <Link 
            href="/profile"
            className="dropdwn_link"
            onClick={()=>setToggle(false)}>
                  My Profile
            </Link>
            <Link 
            href="/create-prompt"
            className="dropdwn_link"
            onClick={()=>setToggle(false)}>
                  Create Post
            </Link>
            <button 
            href=""
            type="button"
            onClick={()=>{setToggle(false);signOut()}}
          className="w-full mt-5 black_btn"

            >
              Sign Out
            </button>
        

            </div>)}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn "
                >
                  signIn
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
