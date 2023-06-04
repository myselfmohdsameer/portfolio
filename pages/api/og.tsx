/* tslint:disable */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import siteMetadata from '@/data/siteMetadata';

export const config = {
  runtime: 'experimental-edge'
};

const fetchFontData = async (fontUrl: string) => {
  const res = await fetch(new URL(fontUrl, import.meta.url));
  return await res.arrayBuffer();
};

export default async function handler(req: NextRequest) {
  const [fontDataBold, fontDataRegular, fontDataMedium] = await Promise.all([
    fetchFontData('../../assets/Inter-Bold.ttf'),
    fetchFontData('../../assets/Inter-Regular.ttf'),
    fetchFontData('../../assets/Inter-Medium.ttf')
  ]);

  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title';

  const isArticleLayout = searchParams.has('article');

  const hasImageUrl = searchParams.has('imgSrc');
  const imageSrc = hasImageUrl ? searchParams.get('imgSrc')?.slice(0, 1000) : null;

  const hasDescription = searchParams.has('description');
  const description = hasDescription
    ? searchParams.get('description')?.slice(0, 1000)
    : 'My default description';

  const isArticleOg = isArticleLayout && hasImageUrl && hasDescription;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121826',
          position: 'relative'
        }}
      >
        <div tw="flex h-full">
          <div tw="flex flex-col w-full p-12">
            {/* Article Image */}
            {isArticleOg && hasImageUrl && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '530px',
                  height: '630px',
                  backgroundImage: `url(${imageSrc})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1260px 630px',
                  backgroundPosition: '-60% 100%'
                }}
              ></div>
            )}
            {/* Skewed portion */}
            {isArticleOg && (
              <div
                style={{
                  transform: 'skewX(-8deg) rotate(90deg)'
                }}
                tw="bg-[#121826] absolute top-0 left-[-300px] h-[900px] w-full"
              ></div>
            )}
            {/* Skewed gradient line */}
            {isArticleOg && (
              <div
                style={{
                  transform: 'skewX(-8deg) rotate(90deg)',
                  backgroundImage:
                    'linear-gradient(to left, transparent, #818cf8 20%, transparent 70%)'
                }}
                tw="absolute top-[100px] left-[197px] h-[4px] w-full"
              ></div>
            )}
            {/* Rays */}
            <div
              tw="absolute w-[1159px] h-[737px] left-[-350px] top-[-250px]"
              style={{
                backgroundImage: `url(https://i.imgur.com/Fjipdg3.png)`
              }}
            ></div>
            <div tw="text-white mt-27 flex-grow">
              <h1
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 'bold',
                  fontSize: '48px',
                  lineHeight: '60px',
                  color: '#fff'
                }}
              >
                {title}
              </h1>
              {isArticleOg && hasDescription && (
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    lineHeight: '28px',
                    color: '#d2d6dc',
                    marginTop: '32px',
                    marginBottom: '80px'
                  }}
                >
                  {description}
                </p>
              )}
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#7d7e84',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <span>by {siteMetadata.author}</span>
                <span>&middot;</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      headers: {
        'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate',
        'Content-Type': 'image/svg+xml'
      }
    }
  );
}
