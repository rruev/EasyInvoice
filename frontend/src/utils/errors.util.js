export const getErrors = async(response) => {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Failed to login');
    error.errors = errorData.errors || [];
    return error;
}