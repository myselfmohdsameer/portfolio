import {
  convertToArticleList,
  getPublishedArticles,
  getWorkTimelineData
} from '@/lib/notion';

import { Ad } from '@/components/Ad';
import { ArticleList } from '@/components/ArticleList';
import { Button } from '@/components/Button';
import { ButtonType } from '@/lib/types';
import { Container } from 'layouts/Container';
import CustomLink from '@/components/CustomLink';
import { GetStaticProps } from 'next';
import Image from 'next/legacy/image';
import { TimelineItem } from '@/components/TimelineItem';
import { TimelineList } from '@/components/TimelineList';
import siteMetadata from '@/data/siteMetadata';
import { useRouter } from 'next/router';

export default function About({ recentArticles, workTimeline }) {
  const { push } = useRouter();
  return (
    <Container title="About Me - Mohd Sameer">
      <h1>
        <span className="block text-base font-semibold tracking-wide text-center text-indigo-500 uppercase dark:text-teal-400">
          About me
        </span>
        <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
          Here's my story.
        </span>
      </h1>
      <p>
        I’m Sameer, a developer,{' '}
        competitive coder,{' '}
        an aspiring SDE{' '}
        and self-proclaimed programmer who specializes in back-end development.
        My mission is to write modular scalable code that runs blazing fast.
      </p>
      <p>
        I’m currently working as a student developer/contributor at{' '}
        <CustomLink href="https://rocket.chat">Rocket.Chat</CustomLink>{' '}
        via Google Summer of Code 2023 to integrate world's largest opensource chatting platform with Miro.
      </p>
      <div>
        <div className="hidden md:block md:float-left">
          <Image
            className="md:mr-8"
            src="https://i.imgur.com/7RguWS2.png"
            placeholder="blur"
            blurDataURL="https://i.imgur.com/7RguWS2.png"
            width={340}
            height={448}
            alt={'back'}
          />
        </div>
        <p>
          Prior to GSoC, I made some projects that are available on my{' '}
          <CustomLink href="https://www.github.com/myselfmohdsameer">
            GitHub
          </CustomLink>{' '}
          through which I learned different tech stacks.
        </p>
        <p>
          I actively participate in Coding Competitions on for{' '}
          <CustomLink href="https://www.leetcode.com">Leetcode</CustomLink>{' '}
          so that I am always ready for 'that' interview.
        </p>
        <p>
          In the meantime I enjoy reading various blogs about backend architecture.
        </p>
        <p>
          You can find me on <a href={siteMetadata.twitter}>Twitter</a> where I
          share tech-related tidbits and build in public, or you can follow me
          on <CustomLink href={siteMetadata.github}>GitHub</CustomLink>. I often
          write about my findings on my{' '}
          <CustomLink href={`${siteMetadata.siteUrl}/blog`}>blog</CustomLink>{' '}
          .
        </p>
        <div></div>
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      <div className="flex justify-center">
        <Ad />
      </div>
      <div className="mt-12 space-y-6">
        <h2 className="m-0 text-gray-900 dark:text-white">Work experience</h2>
        <p>Here's a brief rundown of my most recent experiences.</p>
        {workTimeline ? (
          <TimelineList>
            {workTimeline.map((workItem, index) => (
              <TimelineItem
                key={index}
                title={workItem.title}
                meta={workItem.company}
                link={workItem.company_url}
                meta_small={workItem.duration}
                content={workItem.description}
              />
            ))}
          </TimelineList>
        ) : null}
        <Button
          onButtonClick={() => push(siteMetadata.resume)}
          buttonType={ButtonType.PRIMARY}
        >
          View my resume
        </Button>
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      <div className="mb-12">
        <h2>I love to share my knowledge through writing.</h2>
        <p>Check out a few of my most recent publishings.</p>
        <ArticleList articles={recentArticles} />
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-x-12">
        <div className="col-span-3">
          <h2>Interested in my gear?</h2>
          <p>
            I keep a list of software, applications, extensions, hardware and a
            list of supplies I've used to set up my office for those who are
            interested.
          </p>
          <Button
            buttonType={ButtonType.PRIMARY}
            onButtonClick={() => push('/toolbox')}
          >
            Check out my toolbox
          </Button>
        </div>
        <div className="col-span-2">
          <Image
            className="rounded-3xl group-hover:opacity-75"
            objectFit="cover"
            src="https://res.cloudinary.com/mohdsameer/image/upload/v1637186547/toolbox_hardware.jpg"
            placeholder="blur"
            blurDataURL="https://res.cloudinary.com/mohdsameer/image/upload/v1637186547/toolbox_hardware.jpg"
            width={260}
            height={260}
            layout="responsive"
            alt={'article cover'}
          />
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPublishedArticles(process.env.BLOG_DATABASE_ID);
  const workTimeline = await getWorkTimelineData(process.env.WORK_TIMELINE_DB);
  const { articles } = convertToArticleList(data);

  return {
    props: {
      recentArticles: articles.slice(0, 3),
      workTimeline
    },
    revalidate: 200
  };
};
