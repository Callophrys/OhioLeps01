// import type { RequestHandler } from '@sveltejs/kit';

// export const GET: RequestHandler = async ({ request }) => {
export async function load({ request }: { request: any }) {
    console.log('hi');
    // Get the URL from the request
    const url = new URL(request.url);

    // Extract the pathname from the URL
    const pathname = url.pathname;

    // Remove any trailing slash to avoid empty segment
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    // Split the path into segments by '/'
    const pathSegments = normalizedPath.split('/');

    // Get the last folder segment (or last part of the path)
    const lastFolder = pathSegments[pathSegments.length - 1];

    // Do something with the last folder
    console.log('Last Folder:', lastFolder);

    return { lastFolder: lastFolder }
};

