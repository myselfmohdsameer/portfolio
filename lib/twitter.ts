export async function getTwitterProfilePicture() {
  const queryParams = `user.fields=profile_image_url`;

  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/MeMohdSameer?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    }
  );
  const pictureUrl = await response.json();
  return pictureUrl?.data?.profile_image_url || 'https://i.imgur.com/IA1CbdO.png';
}
