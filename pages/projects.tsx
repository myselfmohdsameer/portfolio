import { Ad } from '@/components/Ad';
import { Container } from 'layouts/Container';
import Image from 'next/legacy/image';

function ButtonLink({ text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center rounded-full px-6 py-1.5 font-semibold transitionbg-midnight text-white dark:bg-gray-200 dark:text-midnight hover:bg-slate-700 bg-midnight no-underline`}
    >
      {text}
      <svg
        className={`mt-0.5 ml-2 -mr-1 stroke-2 stroke-white dark:stroke-midnight`}
        fill="none"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <path
          className="transition opacity-0 group-hover:opacity-100"
          d="M0 5h7"
        ></path>
        <path
          className="transition group-hover:translate-x-[3px]"
          d="M1 1l4 4-4 4"
        ></path>
      </svg>
    </a>
  );
}

export default function Projects() {
  return (
    <Container title="Projects - Mohd Sameer">
      <h1>
        <span className="block text-base font-semibold tracking-wide text-center text-indigo-500 uppercase dark:text-teal-400">
          Projects
        </span>
        <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
          A selection of my favorite works.
        </span>
      </h1>

      <div className="space-y-12">
        <div className="relative w-full overflow-hidden border rounded-3xl bg-gradient-to-b from-slate-50 dark:from-slate-800 dark:to-indigo-900 to-indigo-200 dark:border-slate-700 border-slate-100">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600 to-transparent"></div>
          <div className="grid grid-cols-1 min-h-[500px] md:grid-cols-2">
            <div className="self-end col-span-1 m-8 text-center md:text-left">
              <h2 className="mt-0">URL Shortener</h2>
              <p>
                I created a URL Shortener that uses the most popular tech stack of 2023 that is T3 stack!
                It uses NextJS, Typescript, Tailwind, tRPC and MySQL
              </p>
              <ButtonLink
                text="Visit live"
                href="https://samshortener.vercel.app/"
              />
            </div>
            <div className="md:absolute md:top-4 md:right-[-200px] md:w-[800px]">
              <Image
                objectFit="fill"
                src="https://i.imgur.com/Sp5q8IE.png"
                placeholder="blur"
                blurDataURL="https://i.imgur.com/Sp5q8IE.png"
                width={900}
                height={552}
                layout="intrinsic"
                alt={'Shortener on a Macbook Pro'}
              />
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="flex justify-center">
          <Ad />
        </div>

        <div className="relative w-full overflow-hidden border rounded-3xl bg-gradient-to-b from-purple-50 dark:from-purple-900/50 dark:to-fuchsia-700 to-fuchsia-300 dark:border-slate-700 border-slate-100">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-300 dark:via-fuchsia-600 to-transparent"></div>
          <div className="grid grid-cols-1 min-h-[500px] max-h-[500px] md:grid-cols-2">
            <div className="md:w-[650px] max-h-[500px]">
              <Image
                className="absolute bottom-20 md:bottom-0 md:-left-16"
                objectFit="fill"
                src="https://i.imgur.com/xeobVlW.png"
                placeholder="blur"
                blurDataURL="https://i.imgur.com/xeobVlW.png"
                width={1978}
                height={1713}
                layout="intrinsic"
                alt={'NgLimeade on an iPad'}
              />
            </div>
            <div className="self-end order-first col-span-1 m-8 text-center md:order-last md:text-left">
              <h2 className="mt-0">Miro App for Rocket.Chat</h2>
              <p>
                Miro is one of the most used collaboration and drawing tools and Rocket.Chat is the world's largest open
                source chatting platform, I created an app to integrate them.
              </p>
              <ButtonLink
                text="Visit Git Repo"
                href="https://github.com/RocketChat/Apps.Miro"
              />
            </div>
          </div>
        </div>

        <br />
        <br />

        
      </div>
    </Container>
  );
}
