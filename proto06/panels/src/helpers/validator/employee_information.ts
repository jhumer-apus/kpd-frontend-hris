export const validateImage = (file:any) => {

    if (file instanceof File) {
        // Check the MIME type of the file
        return file.type.startsWith('image/');
    }

    // Check if the file is a string representing a data URL
    if (typeof file === 'string' && file.startsWith('data:image/')) {
      return true;
    }
    
    // Check if the file is a blob object
    if (file instanceof Blob) {
        return file.type.startsWith('image/');
    }
    
    // If none of the above conditions are met, it's not an image
    return false;

}