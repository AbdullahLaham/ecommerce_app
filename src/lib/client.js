import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId: 'dcdpwum0',
    dataset: 'production',
    apiVersion: '2022-07-30',
    useCdn: true,
    token: process.env.SANITY_TOKEN,
});
export const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);