import sanityClient from '@sanity/client';


const options = {
    dataset : "production" , 
    projectId : "fjptx8nz", 
    useCdn : process.env.NODE_ENV === 'production'
}

export default sanityClient(options);