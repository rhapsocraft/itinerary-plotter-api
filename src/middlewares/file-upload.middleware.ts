import multer from 'multer';

// TODO: Upload config injectory based on environment variables
export const upload = multer({ dest: 'uploads/' });
