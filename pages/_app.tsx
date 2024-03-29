import WalletProvider from "client/react/wallet/WalletProvider";
import { FullscreenMenu, MetaTags, SoundButton } from "components";
import { TxProvider } from "contexts/tx";
import type { AppProps } from "next/app";
import Link from "next/link";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import useSound from "use-sound";

import "styles/globals.css";
import "styles/fonts.css";
import "styles/borders.scss";
import { classNames } from "util/css";
import { useRouter } from "next/router";
import { useWallet } from "client";
import { humanize, truncate } from "util/constants";
import { MusicProvider } from "contexts/music";

const WalletInfo = () => {
  const { wallet } = useWallet();

  return (
    <div
      className="hidden md:block w-[30rem] h-24 bg-theme-blue relative"
      style={{
        clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div
        className="w-[30rem] h-24 bg-theme-blue absolute"
        style={{
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          paddingRight: "6px",
          paddingTop: "2px",
        }}
      >
        <div className="flex flex-row items-center justify-between mt-5 ml-24 mr-12 space-x-6">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-row items-center space-x-4">
              <img src="/icons/profile.svg" className="w-auto h-6 -mt-2" />
              <p className="text-white">
                {wallet?.address ? truncate(wallet?.address) : "Not connected"}
              </p>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <img src="/icons/wallet.svg" className="w-auto h-6 -mt-2" />
              <p className="text-white">
                {wallet?.balance
                  ? humanize(wallet?.balance.amount)
                  : "Not connected"}
              </p>
            </div>
          </div>
          <SoundButton />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname == "/status";
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  return (
    <header
      className={
        "hidden " +
        (pathname ? "hidden" : "md:flex") +
        " fixed w-full bg-theme-blue z-10 py-2 px-4 "
      }
      style={{
        borderBottom: "4px solid #E3FFFF",
      }}
    >
      <div className="flex justify-start py-4 pb-0 space-x-8 flex-column">
        <img src="/logo.svg" className="w-auto h-6 mr-8 -mt-1" />
        <Link
          className="text-lg text-white hover:text-slate-300"
          href="/wager"
          onClick={() => {
            setIsNavOpen(false);
            playClick();
          }}
        >
          Create Duel
        </Link>
        <Link
          className="text-lg text-white hover:text-slate-300"
          href="/queue"
          onClick={() => {
            setIsNavOpen(false);
            playClick();
          }}
        >
          View queues
        </Link>
        <Link
          className="text-lg text-white hover:text-slate-300"
          href="/duels"
          onClick={() => {
            setIsNavOpen(false);
            playClick();
          }}
        >
          Ongoing duels
        </Link>
      </div>
    </header>
  );
};

const MobHeader = () => {
  const { wallet } = useWallet();
  return (
    <header
      className="fixed z-10 w-full px-4 py-2 md:hidden bg-theme-blue"
      style={{
        borderBottom: "4px solid #E3FFFF",
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center pt-3 space-x-4">
          <img src="/icons/profile.svg" className="w-auto h-6 -mt-2" />
          <p className="text-white">
            {wallet?.address ? truncate(wallet?.address) : "Not connected"}
          </p>
        </div>
        <div className="flex flex-row items-center pt-3 space-x-4 text-white">
          <FullscreenMenu />
        </div>
      </div>
    </header>
  );
};

export default function WagerApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPageStatus = router.pathname == "/status";
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <WalletProvider>
        <MusicProvider>
          <TxProvider>
            <MobHeader />
            <MetaTags
              title="Token Dueling"
              description="🪄 Duel your Pixel Wizard against other wizards. Prepare your knowledge, place your bet and show who is truely the wisest!"
              image="https://pixelwizards.art/wp-content/uploads/2023/03/tokendueling-min.jpg"
              ogImage="https://pixelwizards.art/wp-content/uploads/2023/03/tokendueling-min.jpg"
              url="https://duel.pixelwizards.art"
            />
            <img
              src="https://pixelwizards.art/wp-content/uploads/2023/03/battle-bg-min-scaled.jpeg"
              className={classNames(
                !isPageStatus && "brightness-50",
                "absolute top-0 right-0 object-cover object-[75%] w-screen h-screen -z-10"
              )}
            />
            <main className="flex flex-col justify-between w-screen h-screen min-h-screen pb-6 overflow-x-hidden text-white">
              <Component {...pageProps} />
              {!isPageStatus && (
                <div className="flex flex-row justify-between w-screen">
                  <div
                    className="w-[30rem] h-24 bg-theme-blue relative"
                    style={{
                      clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div
                      className="w-[30rem] h-24 bg-theme-blue absolute cw-text-box__left"
                      style={{
                        clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)",
                        paddingTop: "4px",
                      }}
                    >
                      <p className="p-4 mr-16 text-sm">
                        Place a bet versus other wizards on what token will
                        outperform the other; set a wager, find an opponent and
                        wait for results!
                      </p>
                    </div>
                  </div>
                  <div className="flex-row hidden pt-6 space-x-16 md:flex">
                    <a
                      href="https://discord.gg/pixelwizards"
                      onClick={() => playClick()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="icons/discord.svg"
                        className="transition duration-75 ease-in-out transform cursor-pointer w-14 hover:scale-105 hover:opacity-80"
                      />
                    </a>
                    <a
                      href="https://twitter.com/pixlwizardsnft"
                      onClick={() => playClick()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="icons/twitter.svg"
                        className="w-12 transition duration-75 ease-in-out transform cursor-pointer hover:scale-105 hover:opacity-80"
                      />
                    </a>
                  </div>
                  <WalletInfo />
                </div>
              )}
            </main>
          </TxProvider>
        </MusicProvider>
      </WalletProvider>
    </>
  );
}
